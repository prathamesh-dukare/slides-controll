const { contextBridge, ipcRenderer } = require("electron");

// const { keyboard, Key } = require("@nut-tree-fork/nut-js");

// contextBridge.exposeInMainWorld("keyboard", {
//   pressKey: async (key) => await keyboard.pressKey(key),
//   releaseKey: async (key) => await keyboard.releaseKey(key),
// });

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke("ping"),
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("roomId", {
  roomId: (roomId) => ipcRenderer.send("roomId", roomId),
});
