<script setup lang="ts">
import { Terminal as PrimeTerminal, TerminalService as PrimeTerminalService } from 'primevue';
import { onBeforeUnmount, onMounted } from 'vue';
import { canCreateWindow, createWindow, windowDefinitions } from '../../lib/windows';

function handleCommand(command: string) {
    const formattedCommand = command.toLocaleLowerCase();

    let result = canCreateWindow(formattedCommand);
    if(result) {
        createWindow(formattedCommand);
        return;
    }

    switch(formattedCommand) {
        case 'help':
            PrimeTerminalService.emit('response', 'help, programs');
            break;

        case 'programs':
            let windowIds = windowDefinitions.value.map(wd => wd.id).join(', ');
            PrimeTerminalService.emit('response', windowIds);
            break;

        default:
            PrimeTerminalService.emit('response', `Unknown command '${command}'.`);
            break;
    }
}

onMounted(() => {
    PrimeTerminalService.on('command', handleCommand);
});
onBeforeUnmount(() => {
    PrimeTerminalService.off('command', handleCommand);
});
</script>

<template>
    <div class="terminal">
        <PrimeTerminal welcome-message="Welcome to L-OS. Type 'help' for a list of commands." prompt="> "></PrimeTerminal>
    </div>
</template>

<style scoped>
.terminal {
    flex: 1;

    display: flex;
    flex-direction: column;

    gap: 0.5rem;
}

.terminal > div {
    flex: 1;
}
</style>