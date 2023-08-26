<template>
    <div class="handler-wrapper">
        <n-button circle class="handle" text @click="test">
            <n-icon color="#fff" size="20">
                <HandRight></HandRight>
            </n-icon>
        </n-button>
    </div>
</template>

<script setup lang="ts">
import {NButton, NIcon} from 'naive-ui'
import {HandRight} from '@vicons/ionicons5'

const ipcRenderer = window.require('electron').ipcRenderer

const test = ()=>{
    let rootPath = ipcRenderer.sendSync('getRootPath')
    window.open(`${rootPath}#/setting`)
}
</script>

<style scoped>
.handler-wrapper{
    display: flex;
    height: 1.5rem;
    background-color: #000;
    -webkit-app-region: drag;
}

</style>