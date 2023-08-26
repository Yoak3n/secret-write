import type { Plugin } from 'vite'
import fs from 'node:fs'
import path from 'path'
import * as electronBuilder from 'electron-builder'
const compileBackground = () => {
    require('esbuild').buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        target: 'node12',
        external: ['electron']
    })
}


export const ElectronBuildPlugin = (): Plugin => {
    return {
        name: 'electron-build-plugin',
        closeBundle() {
            compileBackground()
            // electron-builder 需要指定package.json main
            const jsonData = JSON.parse(fs.readFileSync('package.json', 'utf8'))
            jsonData.main = 'background.js'
            fs.writeFileSync('dist/package.json', JSON.stringify(jsonData, null, 4))
            fs.mkdirSync('dist/node_modules')

            electronBuilder.build({
                config: {
                    directories: {
                        output: path.resolve(process.cwd(), 'release'),
                        app: path.resolve(process.cwd(), 'dist')
                    },
                    files: ['**/*'],
                    asar: true,
                    appId: 'secret-write',
                    productName: 'secret-write',
                    nsis: {
                        oneClick: false,
                        allowToChangeInstallationDirectory: true, // 允许用户指定安装目录
                    }
                },
            })
        },
    }
}