const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const sendBtn = document.querySelector(".send__btn");

//================= Initializing ========================

const currentPeer = new Peer({
  host: "https://noom.onrender.com",
  port: "",
  secure: true,
});
const callToPeer = {};

let videoStream;
let currentVideoStream;
let isSharing = false;
const ROOM_ID = "test";

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

currentPeer.on("open", (id) => socket.emit("join-room", ROOM_ID, id));

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
  $("ul").append(`<li class="message"><b>${userId}</b><br/>${message}</li>`);
  scrollDown();
});

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = $("input");
  socket.emit("message", text.val());
  text.val("");
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

const leaveMeeting = () => {
  if (currentPeer) currentPeer.destroy();
  if (socket) socket.disconnect();
  setEmptyPage();
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
    <span>Share</span>
  `;
}

function setStopShareButton() {
  document.querySelector(".main__share_button").innerHTML = `
    <span>Stop Share</span>
  `;
}

function scrollDown() {
  let d = $(".main__chat_window");
  d.scrollTop(d.prop("scrollHeight"));
}

function setEmptyPage() {
  document.querySelector(".main").innerHTML = `
    <div class="leave-text">You left the meeting!, Thank you for using our VideoConference App</div>
  `;
}
