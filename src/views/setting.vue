<template>
    <div class="setting-wrapper">
        <n-form>
            <n-form-item label="字体颜色">
                <n-color-picker v-model:value="settingStore.foreground_color" :modes="['rgb']"></n-color-picker>
            </n-form-item>
            <n-form-item label="背景颜色">
                <n-color-picker v-model:value="settingStore.background_color" :modes="['rgb']"></n-color-picker>
            </n-form-item>
            <n-form-item label="输出文件">   
                <n-input v-model:value="file" placeholder="输出文件所在路径" @blur="fileChange"></n-input>
            </n-form-item>
            <n-form-item> 
                <n-button class="submmit" type="success" @click="submmitNewSetting" :loading="loadingSubmmit">提交与关闭</n-button>
        
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';

import { NForm, NFormItem, NColorPicker,NInput,NButton } from 'naive-ui';
// import type { UploadFileInfo } from 'naive-ui';
import {useSettingStore} from '../store/modules/setting';




const settingStore = useSettingStore()

let file = ref('./output.txt')
let loadingSubmmit = ref(false)
const fileChange = () => {
    settingStore.change_file_path(file.value)
}
const ipcRenderer = window.require('electron').ipcRenderer
const submmitNewSetting = () => {
    loadingSubmmit.value = true
    let bcc = settingStore.background_color
    let fc = settingStore.foreground_color
    let path = settingStore.output_file_path
    ipcRenderer.sendSync('change-setting',[bcc,fc,path])
    loadingSubmmit.value = false
}

</script>

<style scoped lang="less">
.setting-wrapper{
    -webkit-app-region: drag;
    margin: 2rem 0.5rem ;
    width: 100%;
    .submmit{
        width: 50%;
        margin: 0 auto;
    }
}


</style>