<template>
    <div class="main-wrapper">
        <input v-model="write" @keyup.enter.native="writeCommit" :class="settingStore.showHand ?'show-border':'hide-border'">
        <span>
            <Handler class="handle" v-show="settingStore.showHand"></Handler>
        </span>
       
        
    </div>
</template>

<script setup lang="ts">
import { ref} from 'vue'

import { useSettingStore } from '../store/modules/setting'
import Handler from '../components/part/handler.vue'
import type{fileInfo} from '../utils/file/type'

const settingStore = useSettingStore()
const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
ipcRenderer.on('showhand',()=>{
    settingStore.change_hand_show()
})

ipcRenderer.on('change',(_,data:Array<string>)=>{
    settingStore.change_background_color(data[0])
    settingStore.change_foreground_color(data[1])
    settingStore.change_file_path(data[2])
})


// write action
let write = ref('')

const writeCommit = () => {
    let input: fileInfo = {
        path:settingStore.output_file_path,
        content:write.value
    }
    ipcRenderer.send('ctx',input)
    write.value = ''
}




</script>

<style scoped lang="less">
.main-wrapper{
    
    display: flex;
    width: 100vw;
    height: 100vh;
    background-color: v-bind('settingStore.background_color');
    .show-boder{
        border:.5px solid;
    }
    .hide-border{
        border: none;
    }
    input{
        padding: 0 1rem 0  0;
        width: 90%;
        height: 100%;
        word-wrap: break-word;
        outline: 0;
        background-color: transparent;
        // 隐藏光标
        color: transparent;
        text-shadow: 0 0 0 v-bind('settingStore.foreground_color');
    }
    span{
        display: flex;
        height: 100%;
        .handle{
            margin: auto 0;
        }
    }

}


</style>