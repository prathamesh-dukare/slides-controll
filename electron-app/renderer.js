const information = document.getElementById("info");
const sessionKeyInput = document.getElementById("sessionKey");
const joinSessionButton = document.getElementById("joinSession");
const joinScreen = document.getElementById("join-screen");
const successScreen = document.getElementById("success-screen");

joinSessionButton.addEventListener("click", () => {
  const sessionKey = sessionKeyInput.value.trim();
  if (sessionKey) {
    // Send the session key to main process
    window.roomId.roomId(sessionKey);

    // Hide join screen and show success screen
    joinScreen.style.display = "none";
    successScreen.style.display = "flex";
  }
});

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

const func = async () => {
  const response = await window.versions.ping();
  console.log(response);
};

func();
