const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const chatField = document.querySelector("#chat_message");
const sendBtn = document.querySelector(".send__btn");
const roomField = document.querySelector(".room__field");
const joinBtn = document.querySelector(".join__btn");
const messages = document.querySelector(".messages");

//================= Initializing ========================
//const currentPeer = new Peer();

const currentPeer = new Peer(socket.id, {
  host: "noom.onrender.com",
  port: 443,
  path: "/peerjs",
  secure: true,
});

const currentURL = window.location.href;
const callToPeer = {};

let videoStream;
let currentVideoStream;
let isSharing = false;
let myId = null;

const nav =
  navigator.mediaDevices.getUserMedia ||
  navigator.mediaDevices.webkitGetUserMedia ||
  navigator.mediaDevices.mozGetUserMedia ||
  navigator.mediaDevices.msGetUserMedia;

const screens =
  navigator.mediaDevices.getDisplayMedia ||
  navigator.mediaDevices.webkitGetDisplayMedia ||
  navigator.mediaDevices.mozGetDisplayMedia ||
  navigator.mediaDevices.msGetDisplayMedia;

nav({
  video: true,
  audio: true,
}).then((stream) => {
  videoStream = stream;
  currentVideoStream = stream;
  createMyVideo(stream);
});

//================= Main ========================

function createMyVideo(stream) {
  const myVideo = document.createElement("video");
  myVideo.muted = true;
  myVideo.id = "own";
  addVideoStream(myVideo, stream);
}

currentPeer.on("open", (id) => {
  myId = id;
  const roomURL = currentURL.split("/");
  const room = roomURL[roomURL.length - 1];
  if (room === "" || room === null) return;
  ROOM_ID = room;
  roomField.value = room;
  setRoom(room);
});

currentPeer.on("call", (call) => {
  call.answer(currentVideoStream);

  let userInGrid = false;
  for (let i = 0; i < videoGrid.children.length; i++) {
    const childElement = videoGrid.children[i];

    if (childElement.id === call.peer) {
      userInGrid = true;
      break;
    }
  }

  if (!userInGrid) {
    const video = document.createElement("video");
    addOnStreamHandler(call, video);
  }
});

socket.on("screen-share", (userId) => {
  removeUserVideo(userId);
  connectToNewUser(userId, currentVideoStream);
});

socket.on("user-connected", (userId) =>
  connectToNewUser(userId, currentVideoStream)
);

socket.on("user-disconnected", (userId) => removeUserVideo(userId));

socket.on("createMessage", (message, userId) => {
  const li = document.createElement("li");
  li.innerHTML = `<div class="message"><b>${userId}</b><br/>${message}</div>`;

  messages.append(li);
  messages.scrollTop = messages.scrollHeight;
});

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const message = chatField.value;
  if (message === "") return;

  socket.emit("message", message);
  chatField.value = null;
});

function connectToNewUser(userId, stream) {
  const call = currentPeer.call(userId, stream);
  const video = document.createElement("video");

  addOnStreamHandler(call, video);
  call.on("close", () => {
    video.remove();
  });

  callToPeer[userId] = call;
}

function addOnStreamHandler(call, video) {
  video.id = call.peer;
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.setAttribute("autoplay", "");
  video.setAttribute("playsinline", "");
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}

function removeUserVideo(userId) {
  if (callToPeer[userId]) {
    callToPeer[userId].close();
  }

  for (let i = 0; i < videoGrid.children.length; i++) {
    const childElement = videoGrid.children[i];
    if (childElement.id === userId) {
      videoGrid.removeChild(childElement);
      break;
    }
  }
}

//================= Screen Share ========================

function screenShare() {
  if (isSharing) {
    replaceMyVideo(isSharing, videoStream);
    isSharing = false;
    setShareButton();
  } else {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true, audio: true })
      .then((screenStream) => {
        replaceMyVideo(isSharing, screenStream);
        isSharing = true;
        setStopShareButton();
      })
      .catch((error) => console.error("Error accessing screen share:", error));
  }
}

function replaceMyVideo(isShared, stream) {
  for (let i = 0; i < videoGrid.children.length; i++) {
    const childElement = videoGrid.children[i];
    if (childElement.id === "own") {
      if (isShared && childElement.tagName === "VIDEO") {
        const videoTracks = childElement.srcObject.getVideoTracks();
        if (videoTracks && videoTracks.length > 0) {
          videoTracks.forEach((track) => {
            track.stop();
          });
        }
      }
      videoGrid.removeChild(childElement);
      currentVideoStream = stream;
      createMyVideo(stream);
      socket.emit("share");
      break;
    }
  }
}

joinBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (joinBtn.innerHTML === "Join Meeting") {
    const room = roomField.value;
    if (room === "" || myId == null) return;

    setRoom(room);
  } else {
    if (currentPeer) currentPeer.destroy();
    if (socket) socket.disconnect();
    setEmptyPage();
    roomField.enabled = true;
    joinBtn.innerHTML = "Join Meeting";
    roomField.style = "opacity: 1";
    ROOM_ID = null;
  }
});

function setRoom(room) {
  roomField.enabled = false;
  roomField.style = "opacity: 0.5";
  ROOM_ID = room;
  socket.emit("join-room", room, myId);
  joinBtn.innerHTML = "Leave Meeting";
}

window.addEventListener("beforeunload", (e) => {
  if (currentPeer) currentPeer.destroy();
  if (socket) socket.disconnect();
  ROOM_ID = null;
});

//================= DOM Updates ========================
const muteUnmute = () => {
  const enabled = currentVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    currentVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    currentVideoStream.getAudioTracks()[0].enabled = true;
    setMuteButton();
  }
};

const playStartStop = () => {
  let enabled = currentVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    currentVideoStream.getVideoTracks()[0].enabled = false;
    setPlayVideoButton();
  } else {
    currentVideoStream.getVideoTracks()[0].enabled = true;
    setStopVideoButton();
  }
};

const invite = () => {
  const note = `Share the URL: ${
    currentURL + ROOM_ID
  } or Room Name: ${ROOM_ID}`;
  alert(note);
};

function setMuteButton() {
  document.querySelector(".main__mute_button").innerHTML = `
    <span>Mute</span>
  `;
}

function setUnmuteButton() {
  document.querySelector(".main__mute_button").innerHTML = `
    <span>Unmute</span>
  `;
}

function setStopVideoButton() {
  document.querySelector(".main__video_button").innerHTML = `
    <span>Stop Video</span>
  `;
}

function setPlayVideoButton() {
  document.querySelector(".main__video_button").innerHTML = `
    <span>Play Video</span>
  `;
}

function setShareButton() {
  document.querySelector(".main__share_button").innerHTML = `
    <span>Presentation</span>
  `;
}

function setStopShareButton() {
  document.querySelector(".main__share_button").innerHTML = `
    <span>Stop Presentation</span>
  `;
}

function setEmptyPage() {
  document.querySelector(".main").innerHTML = `
    <div class="leave-text">You left the meeting!, Thank you for using our VideoConference App</div>
  `;
}
