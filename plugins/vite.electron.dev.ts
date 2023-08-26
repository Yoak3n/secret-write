import type {Plugin} from 'vite'
import type {AddressInfo} from 'net'
import {spawn} from 'child_process'
import fs from 'node:fs'

const compileBackground = () =>{
    require('esbuild').buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        target: 'node12',
        external: ['electron']  
    })
}

export const ElectronDevPlugin = ():Plugin => {
    return {
        name: 'electron-dev',
        configureServer(sever){
            compileBackground()
            sever.httpServer?.on('listening',()=> {
                const addressInfo = sever.httpServer?.address() as AddressInfo
                const IP = `http://127.0.0.1:${addressInfo.port}`
                let ElectronProcess =  spawn(require('electron'),['dist/background.js',IP]) // 第一个参数为启动electron的命令行命令
                fs.watchFile('src/background.ts',()=>{
                    ElectronProcess.kill()
                    compileBackground()
                    ElectronProcess =  spawn(require('electron'),['dist/background.js',IP])
                })
                ElectronProcess.stderr.on('data',(data)=>{
                    console.log('日志',data.toString());
                })
            })
        }
    }
}