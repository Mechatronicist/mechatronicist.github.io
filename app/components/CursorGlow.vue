<template>
  <div class="pointer-trail">
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
const positions = Array.from({ length: NUM_GLOWS }, () => ({ x: 0, y: 0 }))
let mouseX = 0, mouseY = 0, scrollY = 0, hue = 0
let animFrame: number
let isVisible = false

onMounted(() => {
  const handleMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (!isVisible) {

      isVisible = true
      setVisibility(1)
    }
  }

  const handleLeave = () => {
    isVisible = false
    setVisibility(0)
  }

  const handleScroll = () => {
    scrollY = window.scrollY
  }

  window.addEventListener('mousemove', handleMove)
  window.addEventListener('mouseleave', handleLeave)
  window.addEventListener('scroll', handleScroll)

  updateTrail()
})

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
})


function setVisibility(alpha: number) {
  glows.value.forEach((el) => {
    if (el) el.style.opacity = `${alpha}`
  })
}

const updateTrail = () => {
  const leader = positions[0]
  if (leader) {
    const diffX = (mouseX - leader.x) * 0.15
    const diffY = (mouseY - leader.y + scrollY) * 0.15
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
        el.style.background = `radial-gradient(circle, hsla(${(hue + i * 15) % 360}, 100%, 60%, ${0.25 - i * 0.02}), transparent 40%)`
    }
  })

  animFrame = requestAnimationFrame(updateTrail)
}

onUnmounted(() => {
  cancelAnimationFrame(animFrame)
  window.removeEventListener('mousemove', () => {})
  window.removeEventListener('', () => {})
  window.removeEventListener('scroll', () => {})
})
</script>

<style scoped>
.pointer-trail {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
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
