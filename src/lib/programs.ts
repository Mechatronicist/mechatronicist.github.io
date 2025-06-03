import { shallowRef } from "vue";

import { registerWindow } from "./windows";
import About from "../components/windows/About.vue";
import Bio from "../components/windows/profile/Bio.vue";
import Terminal from "../components/windows/Terminal.vue";
import Updates from "../components/windows/Updates.vue";
import Experience from "../components/windows/profile/Experience.vue";
import Education from "../components/windows/profile/Education.vue";
import Projects from "../components/windows/profile/Projects.vue";

export function registerPrograms() {
    registerWindow({
        id: 'about',
        name: "About",
        component: shallowRef(About),
        openOnStartup: false,
        iconPath: "/about.png"
    });

    registerWindow({
        id: 'bio',
        name: "Bio",
        component: shallowRef(Bio),
        openOnStartup: true,
        initialSize: {
            x: 600,
            y: 300
        },
        initialPosition: {
            x: 20,
            y: 20
        }
    });

    registerWindow({
        id: 'education',
        name: "Education",
        component: shallowRef(Education),
        openOnStartup: true,
        initialSize: {
            x: 500,
            y: 240
        },
        initialPosition: {
            x: 640,
            y: 20
        },
        iconPath: "/education.png"
    });

    registerWindow({
        id: 'experience',
        name: "Experience",
        component: shallowRef(Experience),
        openOnStartup: true,
        initialSize: {
            x: 600,
            y: 370
        },
        initialPosition: {
            x: 20,
            y: 340
        }
    });

    registerWindow({
        id: 'projects',
        name: "Projects",
        component: shallowRef(Projects),
        openOnStartup: true,
        initialSize: {
            x: 600,
            y: 340
        },
        initialPosition: {
            x: 640,
            y: 280
        },
        iconPath: "/projects.png"
    });

    registerWindow({
        id: 'terminal',
        name: "Terminal",
        component: shallowRef(Terminal),
        initialSize: {
            x: 600,
            y: 380
        },
        iconPath: "/terminal.png"
    });

    registerWindow({
        id: 'updates',
        name: 'Updates',
        component: shallowRef(Updates),
        initialSize: {
            x: 800,
            y: 480
        }
    });
}