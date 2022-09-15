const {app, BrowserWindow, ipcMain, nativeTheme} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 800, 
        height: 600,
        webPreferences:{
            webSecurity: false,
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    function handleClick(){
        if(nativeTheme.shouldUseDarkColors){
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    }

    function darkSystem(){
        nativeTheme.themeSource = 'system'
    }

    ipcMain.handle('dark-mode:toggle', handleClick)
    ipcMain.handle('dark-mode:system', darkSystem)
     

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});