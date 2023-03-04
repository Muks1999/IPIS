const path = require('path');

const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  // const win = new BrowserWindow({
  //   width: 1200, 
  //   height: 800,
  //   webPreferences: {
  //     nodeIntegration: true,
  //   },
  // });
  console.log(window.localStorage.getItem("verified"),"dafs")

  const top = new BrowserWindow()
  const child = new BrowserWindow({ parent: top,resizable:false,movable:false,x:-1,y:-1, height: 200, width: 200, frame: false, alwaysOnTop: true })
  child.loadURL(
    isDev
      ? 'http://localhost:3000/login'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  top.loadURL(
    isDev
      ? 'http://localhost:3000/login'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // and load the index.html of the app.
  // win.loadFile("index.html");
  // win.loadURL(
  //   isDev
  //     ? 'http://localhost:3000/login'
  //     : `file://${path.join(__dirname, '../build/index.html')}`
  // );
  // Open the DevTools.


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});