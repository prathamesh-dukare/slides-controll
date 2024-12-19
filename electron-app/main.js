const { app, BrowserWindow, ipcMain, shell } = require("electron/main");
const { keyboard, Key } = require("@nut-tree-fork/nut-js");
const path = require("node:path");
const { io } = require("socket.io-client");

try {
  if (process.env.NODE_ENV === "development") {
    require("electron-reloader")(module, {
      debug: true,
      watchRenderer: true,
    });
  }
} catch (_) {
  console.log("Error", _);
}

let socket;
let mainWindow;

// create window util
const createWindow = () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    devTools: true,
    maxWidth: 800,
    maxHeight: 600,
    minWidth: 800,
    minHeight: 600,
  });

  mainWindow.webContents.openDevTools();

  mainWindow.loadFile("index.html");

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith("https://")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
};

// on app ready
app.whenReady().then(() => {
  // join room handler
  ipcMain.handle("joinRoom", async (event, roomId) => {
    console.log(
      {
        roomId,
        event: event.sender.id,
      },
      "join room request"
    );

    socket = io("http://localhost:3002", {
      reconnection: true,
    });

    socket.emit("join-room", {
      roomId: roomId,
      type: "client",
    });

    socket.on("room-joined", (data) => {
      mainWindow.webContents.send("roomJoined", "ok");
    });

    socket.on("room-error", (data) => {
      console.log(data, "room error");
      mainWindow.webContents.send("roomError", data);
    });

    socket.on("device-command", async (command) => {
      console.log(command, "received");

      setInterval(async () => {
        await keyboard.pressKey(Key.Left);
        await keyboard.releaseKey(Key.Left);
      }, 5000);

      switch (command) {
        case "left":
          await keyboard.pressKey(Key.Left);
          await keyboard.releaseKey(Key.Left);
          break;
        case "right":
          await keyboard.pressKey(Key.Right);
          await keyboard.releaseKey(Key.Right);
          break;
        case "up":
          await keyboard.pressKey(Key.Up);
          await keyboard.releaseKey(Key.Up);
          break;
        case "down":
          await keyboard.pressKey(Key.Down);
          await keyboard.releaseKey(Key.Down);
          break;
      }
    });
  });

  // quit room handler
  ipcMain.handle("quitRoom", async (event, roomId) => {
    console.log(roomId, "quit room request");
    socket.disconnect();
  });

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
