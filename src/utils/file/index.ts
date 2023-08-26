import {appendFileSync,readFile} from 'node:fs'
import type {fileInfo } from './type'


export const writeSubmmit = (input:fileInfo) => {
    appendFileSync(input.path,input.content)
}

export const readTheFile = (path:string) => {
    readFile(path,(e)=>{
        console.log(e);
    })
}


