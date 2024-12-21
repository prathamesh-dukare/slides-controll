const path = require("node:path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

if (require("electron-squirrel-startup")) app.quit();
const {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  systemPreferences,
} = require("electron/main");
const { keyboard, Key } = require("@nut-tree-fork/nut-js");
const { io } = require("socket.io-client");

const socketServerURL = process.env.SOCKET_SERVER_URL;

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

const checkAccessibilityPermissions = async () => {
  if (process.platform === "darwin") {
    const hasPermission = systemPreferences.isTrustedAccessibilityClient(false);

    if (!hasPermission) {
      const { dialog } = require("electron");
      const result = await dialog.showMessageBox({
        type: "info",
        title: "Accessibility Permissions Required",
        message:
          "This app needs accessibility permissions to function properly.",
        detail:
          "Please grant accessibility permissions in System Preferences when prompted.",
        buttons: ["Open System Preferences", "Cancel"],
        defaultId: 0,
        cancelId: 1,
      });

      if (result.response === 0) {
        systemPreferences.isTrustedAccessibilityClient(true);
      }
    }
  }
};

const createWindow = async () => {
  await checkAccessibilityPermissions();

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

  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }

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

app.whenReady().then(async () => {
  await createWindow();

  // join room handler
  ipcMain.handle("joinRoom", async (event, roomId) => {
    if (
      process.platform === "darwin" &&
      !systemPreferences.isTrustedAccessibilityClient(false)
    ) {
      mainWindow.webContents.send("roomError", {
        message:
          "Accessibility permissions are required. Please grant permissions and try again.",
      });
      return;
    }

    console.log(
      {
        roomId,
        event: event.sender.id,
      },
      "join room request"
    );

    socket = io(socketServerURL, {
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
