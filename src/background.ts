import { app, BrowserWindow, globalShortcut, ipcMain,Menu } from 'electron';
import {writeSubmmit} from './utils/file'

app.whenReady().then(()=>{
    globalShortcut.register('Alt+A',()=>{
        BrowserWindow.getFocusedWindow()?.webContents.send('showhand')
    })
    let show_hide = true
    let mainWin:BrowserWindow = new BrowserWindow({
        show: false,
        title:'秘密写作',
        height: 50,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // webSecurity: false,
        },
        frame:false,
        // resizable:false,
        transparent: true,
        alwaysOnTop: true,

        
    })
    
    let rootPath:string
    if (process.argv[2]){
        rootPath = `${process.argv[2]}/`
        mainWin.loadURL(rootPath)
    }else{
        mainWin.loadFile('index.html')
        rootPath = `file://${__dirname}/index.html`
    }
    let newWindow:BrowserWindow|null
    globalShortcut.register('Alt+Z',()=>{
        newWindow = new BrowserWindow({
            height:563,
            width:500,
            useContentSize:true,
            webPreferences:{
                nodeIntegration:true,
                contextIsolation: false,
                webSecurity:true,
            },
            title:'设置',
            parent:mainWin,
            titleBarStyle:'hiddenInset',
            
        
        })
        newWindow.loadURL(`${rootPath}#/setting`);
        newWindow.on('closed',()=>{
            newWindow = null
        })
        Menu.setApplicationMenu(null)
    })
    globalShortcut.register('Alt+Q',()=>{
        show_hide = !show_hide
        if (show_hide) {
            mainWin.setOpacity(100)
        }else{
            mainWin.setOpacity(0)
        }
        
    })
    mainWin.once('ready-to-show', () => {
        mainWin.show()
    })

    ipcMain.on('ctx',(_,content)=>{
        writeSubmmit(content)
    })
    ipcMain.on('change-setting',(event,content)=>{
        console.log(event);
        mainWin.webContents.send('change',content)
        newWindow?.close()
    })
        
})
app.on('quit',()=>{
    globalShortcut.unregisterAll()
})

