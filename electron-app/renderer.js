const information = document.getElementById("info");
const roomIdInput = document.getElementById("roomId");
const joinRoomButton = document.getElementById("joinRoom");

joinRoomButton.addEventListener("click", () => {
  const roomId = roomIdInput.value;
  window.roomId.roomId(roomId);
});

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // prints out 'pong'
};

func();

// console.log(keyboard);

// setInterval(async () => {
//   console.log("Right arrow key pressed.1");
//   await keyboard.pressKey(Key.Right);
//   await keyboard.releaseKey(Key.Right);

//   console.log("Right arrow key pressed.");
// }, 2000);
