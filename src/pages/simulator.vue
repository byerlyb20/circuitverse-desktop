<template>
    <QuickButton />
    <ContextMenu />
    <Extra />
    <Helper />
</template>

<script setup lang="ts">
import QuickButton from '#/components/Navbar/QuickButton/QuickButton.vue'
import ContextMenu from '@/ContextMenu/ContextMenu.vue'
import Extra from '@/Extra.vue'
import { defineComponent, onMounted } from 'vue'
import { setup as setupSimulator } from '../simulator/src/setup'
import Helper from '#/components/helpers/Helper.vue'

defineComponent({
    components: {
        ContextMenu,
        Extra,
    },
})

onMounted(() => {
    setupSimulator()
})
</script>
