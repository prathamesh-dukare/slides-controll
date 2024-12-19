// element selectors

const information = document.getElementById("info");
const sessionKeyInput = document.getElementById("sessionKey");
const joinSessionButton = document.getElementById("joinSession");
const joinForm = document.getElementById("joinForm");
const joinScreen = document.getElementById("join-screen");
const successScreen = document.getElementById("success-screen");
const quitSessionBtn = document.getElementById("quitSession");
const confirmDialog = document.getElementById("confirmDialog");
const confirmQuitBtn = document.getElementById("confirmQuit");
const cancelQuitBtn = document.getElementById("cancelQuit");
const joinButtonText = joinSessionButton.querySelector("span");
const joinButtonSpinner = joinSessionButton.querySelector(".spinner");
const errorMessage = document.getElementById("errorMessage");

// event listeners

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const sessionKey = sessionKeyInput.value.trim().toUpperCase();
  if (sessionKey) {
    errorMessage.style.display = "none";
    joinButtonText.textContent = "Joining Session...";
    joinButtonSpinner.style.display = "inline-block";
    joinSessionButton.disabled = true;

    window.roomActions.joinRoom(sessionKey);
  }
});

quitSessionBtn.addEventListener("click", () => {
  confirmDialog.style.display = "flex";
});

cancelQuitBtn.addEventListener("click", () => {
  confirmDialog.style.display = "none";
});

confirmQuitBtn.addEventListener("click", () => {
  window.roomActions.quitRoom();
  confirmDialog.style.display = "none";

  document.getElementById("success-screen").style.display = "none";
  document.getElementById("join-screen").style.display = "flex";

  document.getElementById("sessionKey").value = "";
});

window.roomResponse.onRoomJoined((message) => {
  if (message === "ok") {
    joinButtonText.textContent = "Join Session";
    joinButtonSpinner.style.display = "none";
    joinSessionButton.disabled = false;
    errorMessage.style.display = "none";

    joinScreen.style.display = "none";
    successScreen.style.display = "flex";
  } else {
    joinButtonText.textContent = "Join Session";
    joinButtonSpinner.style.display = "none";
    joinSessionButton.disabled = false;

    joinScreen.style.display = "flex";
    successScreen.style.display = "none";
  }
});

window.roomResponse.onRoomError((message) => {
  console.log(message, "errorMessage");

  joinButtonText.textContent = "Join Session";
  joinButtonSpinner.style.display = "none";
  joinSessionButton.disabled = false;

  const errorMessageSpan = errorMessage.querySelector("span");
  errorMessageSpan.textContent = message;
  errorMessage.style.display = "flex";

  sessionKeyInput.value = "";

  successScreen.style.display = "none";
  joinScreen.style.display = "flex";
});

sessionKeyInput.addEventListener("input", () => {
  errorMessage.style.display = "none";
});

information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
