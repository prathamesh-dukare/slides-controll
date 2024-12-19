const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("roomActions", {
  joinRoom: (roomId) => ipcRenderer.invoke("joinRoom", roomId),
  quitRoom: () => ipcRenderer.invoke("quitRoom"),
});

contextBridge.exposeInMainWorld("roomResponse", {
  onRoomError: (callback) =>
    ipcRenderer.on("roomError", (_event, data) => callback(data)),
  removeRoomError: (callback) =>
    ipcRenderer.removeListener("roomError", callback),
  onRoomJoined: (callback) =>
    ipcRenderer.on("roomJoined", (_event, statusText) => callback(statusText)),
  // removeRoomJoined: (callback) =>
  //   ipcRenderer.removeListener("room-joined", callback),
});
