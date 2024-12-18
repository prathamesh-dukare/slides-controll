const { app, BrowserWindow, ipcMain } = require("electron/main");
const { keyboard, Key } = require("@nut-tree-fork/nut-js");
const path = require("node:path");
const { io } = require("socket.io-client");

let socket;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Connect to signaling server
  socket = io("http://localhost:3002", {
    reconnection: true,
  });

  // Join room as host
  socket.emit("join-room", {
    roomId: "7b1f03",
    type: "client",
  });

  // Listen for commands
  socket.on("device-command", async (command) => {
    console.log(command, "received");
    switch (command) {
      case "left":
        await keyboard.pressKey(Key.Right);
        await keyboard.releaseKey(Key.Right);
        console.log("left");

        break;
      case "right":
        await keyboard.pressKey(Key.Right);
        await keyboard.releaseKey(Key.Right);
        console.log("right");
        break;
    }
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

console.log("Window created");
