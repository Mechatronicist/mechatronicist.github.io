import { shallowRef } from "vue";

import { registerWindow } from "./windows";
import About from "../components/windows/About.vue";
import Terminal from "../components/windows/Terminal.vue";
import Updates from "../components/windows/Updates.vue";

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