import { shallowRef } from "vue";

import { registerWindow } from "./windows";
import About from "../components/windows/About.vue";
import Terminal from "../components/windows/Terminal.vue";

export function registerPrograms() {
    registerWindow({
        id: 'about',
        name: "About",
        component: shallowRef(About),
        openOnStartup: true
    });

    registerWindow({
        id: 'terminal',
        name: "Terminal",
        component: shallowRef(Terminal),
        initialSize: {
            x: 600,
            y: 380
        }
    });
}