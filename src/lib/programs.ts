import { shallowRef } from "vue";
import HelloWorld from "../components/HelloWorld.vue";
import UuidGenerator from "../components/UuidGenerator.vue";
import Terminal from "../components/Terminal.vue";
import { registerWindow } from "./windows";
import About from "../components/About.vue";

export function registerPrograms() {
    registerWindow({
        id: 'uuid-gen',
        name: "UUID Generator",
        component: shallowRef(UuidGenerator)
    });

    registerWindow({
        id: 'about',
        name: "About",
        component: shallowRef(About)
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
        id: "test",
        name: "Test Window",
        component: shallowRef(HelloWorld)
    });
}