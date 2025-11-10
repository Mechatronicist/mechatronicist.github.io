<template>
  <div class="pointer-trail">
    <div v-for="i in 2"
      :key="i"
      ref="g_points"
      class="gravity-point"
    ></div>
    <div
      v-for="i in NUM_GLOWS"
      :key="i"
      ref="glows"
      class="glow"
    ></div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const NUM_GLOWS = 8
const glows = ref<HTMLElement[]>([])
const g_points = ref<HTMLElement[]>([])
const positions = Array.from({ length: NUM_GLOWS }, () => ({ x: 0, y: 0 }))
let mouseX = 0, mouseY = 0, scrollY = 0, hue = 0, floatVX = 0, floatVY = 0
let animFrame: number
let isTracked = false

function setVisibility(alpha: number) {
  glows.value.forEach((el) => {
    if (el) el.style.opacity = `${alpha}`
  })
}

let attractorX1 = 0
let attractorY1 = 0
let attractorX2 = 0
let attractorY2 = 0
let attractorTimer = 0
let gravityStrength = 0.2
let damping = 0.99
let orbitSpeed = 0.5

function applyDrift(leader: { x: number; y: number }) {
  attractorTimer += orbitSpeed

  // --- two attractors wandering around screen center ---
  attractorX1 = window.innerWidth / 2 + Math.sin(attractorTimer * 0.03) * (window.innerWidth / 2 - 200)
  attractorY1 = window.innerHeight / 2 + Math.cos(attractorTimer * 0.03) * (window.innerHeight / 2 - 200)

  // second attractor moves slightly out of phase and offset for unpredictability
  attractorX2 = window.innerWidth / 2 + Math.sin(attractorTimer * 0.021 + Math.PI / 3) * (window.innerWidth / 2 - 200)
  attractorY2 = window.innerHeight / 2 + Math.cos(attractorTimer * 0.017 + Math.PI / 4) * (window.innerHeight / 2 - 200)

  // optional: visualize attractors
  g_points.value.forEach((el, i) => {
    if (!el) return
    if (i > 0) {
      el.style.transform = `translate(${attractorX2 - 10}px, ${attractorY2 - 10}px)`
    }
    else {
      el.style.transform = `translate(${attractorX1 - 10}px, ${attractorY1 - 10}px)`
    }
  })

  // --- compute combined vector toward both attractors ---
  const dx1 = attractorX1 - leader.x
  const dy1 = attractorY1 - leader.y
  const dx2 = attractorX2 - leader.x
  const dy2 = attractorY2 - leader.y
  const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1)
  const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2)

  // normalize direction vectors
  const dirX1 = dx1 / dist1
  const dirY1 = dy1 / dist1
  const dirX2 = dx2 / dist2
  const dirY2 = dy2 / dist2

  // --- gravitational pull ---
  const pull1 = gravityStrength * 0.5 * orbitSpeed
  const pull2 = gravityStrength * 0.5 * orbitSpeed

  // combined acceleration
  const ax = dirX1 * pull1 + dirX2 * pull2
  const ay = dirY1 * pull1 + dirY2 * pull2

  // --- integrate velocity ---
  floatVX += ax
  floatVY += ay

  // --- apply damping ---
  floatVX *= damping
  floatVY *= damping

  // --- limit velocity ---
  const speed = Math.sqrt(floatVX * floatVX + floatVY * floatVY)
  const maxSpeed = 10
  if (speed > maxSpeed) {
    floatVX = (floatVX / speed) * maxSpeed
    floatVY = (floatVY / speed) * maxSpeed
  }

  // --- update position ---
  leader.x += floatVX
  leader.y += floatVY

  return leader
}

function handleLeave() {
  const leader = positions[0]
  isTracked = false
  if (leader) {
    floatVX = (mouseX - leader.x) * 0.1
    floatVY = (mouseY - leader.y) * 0.1
  }
  
}

function onPointerMove(e: PointerEvent) {
  mouseX = (e as PointerEvent).clientX
  mouseY = (e as PointerEvent).clientY
  if (!isTracked) {
    isTracked = true
    setVisibility(1)
  }
}

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX
  mouseY = e.clientY
  if (!isTracked) {
    isTracked = true
    setVisibility(1)
  }
}

function onScroll() {
  scrollY = window.scrollY
}

function onDocumentMouseOut(e: MouseEvent) {
  if ((e as any).relatedTarget === null) {
    handleLeave()
  }
}

function onWindowBlur() {
  handleLeave()
}

// touch fallback for mobile
function onTouchStart(e: TouchEvent) {
  if (e.touches && e.touches[0]) {
    const t = e.touches[0]
    mouseX = t.clientX
    mouseY = t.clientY
  }
  isTracked = true
  setVisibility(1)
}

function onTouchEnd() {
  handleLeave()
}

onMounted(() => {
  //window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseout', onDocumentMouseOut)
  window.addEventListener('blur', onWindowBlur)
  window.addEventListener('scroll', onScroll)
  window.addEventListener('touchstart', onTouchStart, { passive: true })
  window.addEventListener('touchend', onTouchEnd)

  attractorX1 = attractorX2 = window.innerWidth / 2
  attractorY1 = attractorY2 = window.innerHeight / 2

  updateTrail()
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
})


const updateTrail = () => {
  let leader = positions[0]
  if (leader) {
    let diffX
    let diffY
    if(isTracked) {
      diffX = (mouseX - leader.x) * 0.15
      diffY = (mouseY - leader.y + scrollY) * 0.15
    }
    else {
      leader = applyDrift(leader)
      diffX = floatVX
      diffY = floatVY
    }
    leader.x += diffX
    leader.y += diffY
    const speed = Math.sqrt(diffX * diffX + diffY * diffY)
    hue = (hue + speed * 0.05) % 360
  }

  // Each follower moves toward the one before it
  for (let i = 1; i < positions.length; i++) {
    const prev = positions[i - 1]
    const curr = positions[i]
    if (prev && curr) {
        const dx = (prev.x - curr.x) * 0.25
        const dy = (prev.y - curr.y) * 0.25
        curr.x += dx
        curr.y += dy
    }
  }

  // Apply transforms
  positions.forEach((p, i) => {
    const el = glows.value[i]
    if (!el) return
    const next = i > 0 ? positions[i - 1] : leader
    if (next) {
        const dx = next.x - p.x
        const dy = next.y - p.y
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)
        const speed = Math.sqrt(dx * dx + dy * dy)
        const stretch = Math.min(1 + speed * 0.02, 2.5)

        el.style.transform = `
        translate(${p.x - 50}px, ${p.y - 50}px)
        rotate(${angle}deg)
        scale(${stretch}, ${1 / stretch})
        `
        el.style.background = `radial-gradient(circle, hsla(${(hue + i * 15) % 360}, 100%, 60%, ${0.25 - i * 0.02}), transparent 60%)`
    }
  })

  animFrame = requestAnimationFrame(updateTrail)
}

onUnmounted(() => {
  //window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseout', onDocumentMouseOut)
  window.removeEventListener('blur', onWindowBlur)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('touchstart', onTouchStart)
  window.removeEventListener('touchend', onTouchEnd)

  cancelAnimationFrame(animFrame)
})
</script>

<style scoped>
.pointer-trail {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.gravity-point {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgb(255, 255, 255));
  opacity: 0
}

.glow {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  filter: blur(50px);
  transition: background 0.1s ease, opacity 0.5s ease;
  mix-blend-mode: screen;
  opacity: 0; /* hidden until mouse moves */
}
</style>
