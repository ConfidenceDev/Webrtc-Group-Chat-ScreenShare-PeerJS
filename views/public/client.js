function _0x1564(_0x325f34, _0x411546) {
  const _0x372067 = _0x3720();
  return (
    (_0x1564 = function (_0x156481, _0x553a09) {
      _0x156481 = _0x156481 - 0x144;
      let _0x4e066e = _0x372067[_0x156481];
      return _0x4e066e;
    }),
    _0x1564(_0x325f34, _0x411546)
  );
}
const _0x29ac21 = _0x1564;
(function (_0x2b1020, _0x49d5d9) {
  const _0x34dce5 = _0x1564,
    _0x310e9f = _0x2b1020();
  while (!![]) {
    try {
      const _0x596d91 =
        parseInt(_0x34dce5(0x15e)) / 0x1 +
        (parseInt(_0x34dce5(0x166)) / 0x2) *
          (parseInt(_0x34dce5(0x16c)) / 0x3) +
        -parseInt(_0x34dce5(0x15d)) / 0x4 +
        (-parseInt(_0x34dce5(0x190)) / 0x5) *
          (parseInt(_0x34dce5(0x17f)) / 0x6) +
        (parseInt(_0x34dce5(0x155)) / 0x7) *
          (parseInt(_0x34dce5(0x17e)) / 0x8) +
        parseInt(_0x34dce5(0x144)) / 0x9 +
        (parseInt(_0x34dce5(0x182)) / 0xa) *
          (-parseInt(_0x34dce5(0x18e)) / 0xb);
      if (_0x596d91 === _0x49d5d9) break;
      else _0x310e9f["push"](_0x310e9f["shift"]());
    } catch (_0x5e1f63) {
      _0x310e9f["push"](_0x310e9f["shift"]());
    }
  }
})(_0x3720, 0x32a0b);
const socket = io("/"),
  videoGrid = document["getElementById"](_0x29ac21(0x173)),
  chatField = document["querySelector"](_0x29ac21(0x168)),
  sendBtn = document[_0x29ac21(0x152)](_0x29ac21(0x146)),
  roomField = document[_0x29ac21(0x152)](_0x29ac21(0x15b)),
  joinBtn = document[_0x29ac21(0x152)](_0x29ac21(0x195)),
  messages = document[_0x29ac21(0x152)](_0x29ac21(0x160)),
  currentPeer = new Peer(socket["id"], {
    host: _0x29ac21(0x17b),
    port: 0x1bb,
    path: _0x29ac21(0x16d),
    secure: !![],
  }),
  currentURL = window[_0x29ac21(0x1a0)][_0x29ac21(0x174)],
  callToPeer = {};
let videoStream,
  currentVideoStream,
  isSharing = ![],
  myId = null;
const nav =
    navigator[_0x29ac21(0x1a7)][_0x29ac21(0x18c)] ||
    navigator[_0x29ac21(0x1a7)][_0x29ac21(0x184)] ||
    navigator[_0x29ac21(0x1a7)][_0x29ac21(0x1a1)] ||
    navigator[_0x29ac21(0x1a7)][_0x29ac21(0x159)],
  screens =
    navigator[_0x29ac21(0x1a7)][_0x29ac21(0x19d)] ||
    navigator[_0x29ac21(0x1a7)][_0x29ac21(0x14b)] ||
    navigator[_0x29ac21(0x1a7)][_0x29ac21(0x191)] ||
    navigator[_0x29ac21(0x1a7)][_0x29ac21(0x19a)];
nav({
  video: !![],
  audio: !![],
})[_0x29ac21(0x178)]((_0x58b6db) => {
  (videoStream = _0x58b6db),
    (currentVideoStream = _0x58b6db),
    createMyVideo(_0x58b6db);
});
function createMyVideo(_0x32eb45) {
  const _0x2c09a8 = _0x29ac21,
    _0x5656ff = document[_0x2c09a8(0x19e)](_0x2c09a8(0x14e));
  (_0x5656ff[_0x2c09a8(0x189)] = !![]),
    (_0x5656ff["id"] = _0x2c09a8(0x18a)),
    addVideoStream(_0x5656ff, _0x32eb45);
}
currentPeer["on"](_0x29ac21(0x1a3), (_0x30693e) => {
  const _0x427e99 = _0x29ac21;
  myId = _0x30693e;
  const _0x54ead1 = currentURL[_0x427e99(0x162)]("/"),
    _0x1cc1a0 = _0x54ead1[_0x54ead1[_0x427e99(0x1a5)] - 0x1];
  if (_0x1cc1a0 === "" || _0x1cc1a0 === null) return;
  (ROOM_ID = _0x1cc1a0),
    (roomField[_0x427e99(0x1a2)] = _0x1cc1a0),
    setRoom(_0x1cc1a0);
}),
  currentPeer["on"](_0x29ac21(0x18d), (_0xd7b78a) => {
    const _0x5b24c3 = _0x29ac21;
    _0xd7b78a[_0x5b24c3(0x156)](currentVideoStream);
    let _0x21129a = ![];
    for (
      let _0x35d5b4 = 0x0;
      _0x35d5b4 < videoGrid[_0x5b24c3(0x16f)][_0x5b24c3(0x1a5)];
      _0x35d5b4++
    ) {
      const _0x24f50b = videoGrid[_0x5b24c3(0x16f)][_0x35d5b4];
      if (_0x24f50b["id"] === _0xd7b78a[_0x5b24c3(0x18f)]) {
        _0x21129a = !![];
        break;
      }
    }
    if (!_0x21129a) {
      const _0x37cce2 = document[_0x5b24c3(0x19e)](_0x5b24c3(0x14e));
      addOnStreamHandler(_0xd7b78a, _0x37cce2);
    }
  }),
  socket["on"](_0x29ac21(0x192), (_0x58b0f1) => {
    removeUserVideo(_0x58b0f1), connectToNewUser(_0x58b0f1, currentVideoStream);
  }),
  socket["on"](_0x29ac21(0x180), (_0x44cb0a) =>
    connectToNewUser(_0x44cb0a, currentVideoStream)
  ),
  socket["on"](_0x29ac21(0x14a), (_0x3c07ae) => removeUserVideo(_0x3c07ae)),
  socket["on"](_0x29ac21(0x16a), (_0x567a38, _0x1242ae) => {
    const _0xdda199 = _0x29ac21,
      _0x28fca1 = document[_0xdda199(0x19e)]("li");
    (_0x28fca1[_0xdda199(0x17c)] =
      _0xdda199(0x19c) +
      _0x1242ae +
      _0xdda199(0x17d) +
      _0x567a38 +
      _0xdda199(0x145)),
      messages[_0xdda199(0x181)](_0x28fca1),
      (messages[_0xdda199(0x187)] = messages["scrollHeight"]);
  }),
  sendBtn["addEventListener"](_0x29ac21(0x1a4), (_0x4f5d88) => {
    const _0x48bf3e = _0x29ac21;
    _0x4f5d88[_0x48bf3e(0x199)]();
    const _0x507922 = chatField[_0x48bf3e(0x1a2)];
    if (_0x507922 === "") return;
    socket[_0x48bf3e(0x19b)](_0x48bf3e(0x158), _0x507922),
      (chatField[_0x48bf3e(0x1a2)] = null);
  });
function connectToNewUser(_0x3588d3, _0x239fc7) {
  const _0x3f5a3f = _0x29ac21,
    _0x5ca86b = currentPeer[_0x3f5a3f(0x18d)](_0x3588d3, _0x239fc7),
    _0x301b8a = document[_0x3f5a3f(0x19e)](_0x3f5a3f(0x14e));
  addOnStreamHandler(_0x5ca86b, _0x301b8a),
    _0x5ca86b["on"](_0x3f5a3f(0x157), () => {
      const _0x4d4432 = _0x3f5a3f;
      _0x301b8a[_0x4d4432(0x176)]();
    }),
    (callToPeer[_0x3588d3] = _0x5ca86b);
}
function addOnStreamHandler(_0x5dfdea, _0x177ac0) {
  const _0x1a4e60 = _0x29ac21;
  (_0x177ac0["id"] = _0x5dfdea[_0x1a4e60(0x18f)]),
    _0x5dfdea["on"](_0x1a4e60(0x15a), (_0x47d002) => {
      addVideoStream(_0x177ac0, _0x47d002);
    });
}
function addVideoStream(_0x5b7e2e, _0x4915f2) {
  const _0x426f08 = _0x29ac21;
  (_0x5b7e2e[_0x426f08(0x151)] = _0x4915f2),
    _0x5b7e2e[_0x426f08(0x14d)](_0x426f08(0x197), ""),
    _0x5b7e2e[_0x426f08(0x14d)](_0x426f08(0x165), ""),
    _0x5b7e2e[_0x426f08(0x17a)](_0x426f08(0x177), () => {
      const _0x22f0bd = _0x426f08;
      _0x5b7e2e[_0x22f0bd(0x175)]();
    }),
    videoGrid[_0x426f08(0x181)](_0x5b7e2e);
}
function removeUserVideo(_0x10a851) {
  const _0x50f5b0 = _0x29ac21;
  callToPeer[_0x10a851] && callToPeer[_0x10a851][_0x50f5b0(0x157)]();
  for (
    let _0x15634b = 0x0;
    _0x15634b < videoGrid[_0x50f5b0(0x16f)][_0x50f5b0(0x1a5)];
    _0x15634b++
  ) {
    const _0x4ce6e0 = videoGrid[_0x50f5b0(0x16f)][_0x15634b];
    if (_0x4ce6e0["id"] === _0x10a851) {
      videoGrid["removeChild"](_0x4ce6e0);
      break;
    }
  }
}
function screenShare() {
  const _0x12ed94 = _0x29ac21;
  isSharing
    ? (replaceMyVideo(isSharing, videoStream),
      (isSharing = ![]),
      setShareButton())
    : navigator["mediaDevices"]
        [_0x12ed94(0x19d)]({
          cursor: !![],
          audio: !![],
        })
        [_0x12ed94(0x178)]((_0x1098f7) => {
          replaceMyVideo(isSharing, _0x1098f7),
            (isSharing = !![]),
            setStopShareButton();
        })
        [_0x12ed94(0x171)]((_0x127af3) =>
          console[_0x12ed94(0x150)](_0x12ed94(0x188), _0x127af3)
        );
}
function replaceMyVideo(_0x310293, _0x7363cd) {
  const _0x45faa6 = _0x29ac21;
  for (
    let _0x5925d7 = 0x0;
    _0x5925d7 < videoGrid[_0x45faa6(0x16f)][_0x45faa6(0x1a5)];
    _0x5925d7++
  ) {
    const _0x1e2d22 = videoGrid[_0x45faa6(0x16f)][_0x5925d7];
    if (_0x1e2d22["id"] === _0x45faa6(0x18a)) {
      if (_0x310293 && _0x1e2d22[_0x45faa6(0x1a8)] === _0x45faa6(0x19f)) {
        const _0x37d721 = _0x1e2d22[_0x45faa6(0x151)][_0x45faa6(0x18b)]();
        _0x37d721 &&
          _0x37d721[_0x45faa6(0x1a5)] > 0x0 &&
          _0x37d721[_0x45faa6(0x194)]((_0x2cae30) => {
            const _0x30c72d = _0x45faa6;
            _0x2cae30[_0x30c72d(0x149)]();
          });
      }
      videoGrid[_0x45faa6(0x1a6)](_0x1e2d22),
        (currentVideoStream = _0x7363cd),
        createMyVideo(_0x7363cd),
        socket[_0x45faa6(0x19b)](_0x45faa6(0x161));
      break;
    }
  }
}
joinBtn[_0x29ac21(0x17a)](_0x29ac21(0x1a4), (_0xa848d2) => {
  const _0x162cc4 = _0x29ac21;
  _0xa848d2[_0x162cc4(0x199)]();
  if (joinBtn[_0x162cc4(0x17c)] === _0x162cc4(0x14f)) {
    const _0x5ebc70 = roomField[_0x162cc4(0x1a2)];
    if (_0x5ebc70 === "" || myId == null) return;
    setRoom(_0x5ebc70);
  } else {
    if (currentPeer) currentPeer[_0x162cc4(0x15f)]();
    if (socket) socket[_0x162cc4(0x169)]();
    setEmptyPage(),
      (roomField[_0x162cc4(0x15c)] = !![]),
      (joinBtn[_0x162cc4(0x17c)] = _0x162cc4(0x14f)),
      (roomField[_0x162cc4(0x196)] = _0x162cc4(0x147)),
      (ROOM_ID = null);
  }
});
function setRoom(_0x16888a) {
  const _0x2da199 = _0x29ac21;
  (roomField[_0x2da199(0x15c)] = ![]),
    (roomField[_0x2da199(0x196)] = _0x2da199(0x148)),
    (ROOM_ID = _0x16888a),
    socket[_0x2da199(0x19b)](_0x2da199(0x186), _0x16888a, myId),
    (joinBtn[_0x2da199(0x17c)] = _0x2da199(0x193));
}
window[_0x29ac21(0x17a)](_0x29ac21(0x179), (_0x3e74c8) => {
  const _0x4f4c30 = _0x29ac21;
  if (currentPeer) currentPeer[_0x4f4c30(0x15f)]();
  if (socket) socket[_0x4f4c30(0x169)]();
  ROOM_ID = null;
});
function _0x3720() {
  const _0x2b74ad = [
    "addEventListener",
    "noom.onrender.com",
    "innerHTML",
    "</b><br/>",
    "8ePaNxK",
    "640086PNxzTT",
    "user-connected",
    "append",
    "2654710PeaKBR",
    ".main__share_button",
    "webkitGetUserMedia",
    "\x0a\x20\x20\x20\x20<span>Play\x20Video</span>\x0a\x20\x20",
    "join-room",
    "scrollTop",
    "Error\x20accessing\x20screen\x20share:",
    "muted",
    "own",
    "getVideoTracks",
    "getUserMedia",
    "call",
    "11saVsxY",
    "peer",
    "5zqKuHe",
    "mozGetDisplayMedia",
    "screen-share",
    "Leave\x20Meeting",
    "forEach",
    ".join__btn",
    "style",
    "autoplay",
    "Share\x20the\x20URL:\x20",
    "preventDefault",
    "msGetDisplayMedia",
    "emit",
    "<div\x20class=\x22message\x22><b>",
    "getDisplayMedia",
    "createElement",
    "VIDEO",
    "location",
    "mozGetUserMedia",
    "value",
    "open",
    "click",
    "length",
    "removeChild",
    "mediaDevices",
    "tagName",
    "2783520tpVzlU",
    "</div>",
    ".send__btn",
    "opacity:\x201",
    "opacity:\x200.5",
    "stop",
    "user-disconnected",
    "webkitGetDisplayMedia",
    "\x0a\x20\x20\x20\x20<span>Stop\x20Presentation</span>\x0a\x20\x20",
    "setAttribute",
    "video",
    "Join\x20Meeting",
    "error",
    "srcObject",
    "querySelector",
    "\x0a\x20\x20\x20\x20<span>Mute</span>\x0a\x20\x20",
    ".main__mute_button",
    "1049741yNFseS",
    "answer",
    "close",
    "message",
    "msGetUserMedia",
    "stream",
    ".room__field",
    "enabled",
    "1194552oUwHGn",
    "317360Njoaqm",
    "destroy",
    ".messages",
    "share",
    "split",
    "\x0a\x20\x20\x20\x20<div\x20class=\x22leave-text\x22>You\x20left\x20the\x20meeting!,\x20Thank\x20you\x20for\x20using\x20our\x20VideoConference\x20App</div>\x0a\x20\x20",
    ".main__video_button",
    "playsinline",
    "7004JBBANM",
    "\x0a\x20\x20\x20\x20<span>Presentation</span>\x0a\x20\x20",
    "#chat_message",
    "disconnect",
    "createMessage",
    "\x20or\x20Room\x20Name:\x20",
    "87BNkpyb",
    "/peerjs",
    "\x0a\x20\x20\x20\x20<span>Stop\x20Video</span>\x0a\x20\x20",
    "children",
    ".main",
    "catch",
    "getAudioTracks",
    "video-grid",
    "href",
    "play",
    "remove",
    "loadedmetadata",
    "then",
    "beforeunload",
  ];
  _0x3720 = function () {
    return _0x2b74ad;
  };
  return _0x3720();
}
const muteUnmute = () => {
    const _0x164271 = _0x29ac21,
      _0x33fb48 = currentVideoStream[_0x164271(0x172)]()[0x0][_0x164271(0x15c)];
    _0x33fb48
      ? ((currentVideoStream[_0x164271(0x172)]()[0x0]["enabled"] = ![]),
        setUnmuteButton())
      : ((currentVideoStream[_0x164271(0x172)]()[0x0][_0x164271(0x15c)] = !![]),
        setMuteButton());
  },
  playStartStop = () => {
    const _0x30681a = _0x29ac21;
    let _0x346fe4 =
      currentVideoStream[_0x30681a(0x18b)]()[0x0][_0x30681a(0x15c)];
    _0x346fe4
      ? ((currentVideoStream[_0x30681a(0x18b)]()[0x0][_0x30681a(0x15c)] = ![]),
        setPlayVideoButton())
      : ((currentVideoStream["getVideoTracks"]()[0x0][_0x30681a(0x15c)] = !![]),
        setStopVideoButton());
  },
  invite = () => {
    const _0x326458 = _0x29ac21,
      _0x5b765e =
        _0x326458(0x198) + (currentURL + ROOM_ID) + _0x326458(0x16b) + ROOM_ID;
    alert(_0x5b765e);
  };
function setMuteButton() {
  const _0x3c4cb7 = _0x29ac21;
  document[_0x3c4cb7(0x152)](_0x3c4cb7(0x154))[_0x3c4cb7(0x17c)] =
    _0x3c4cb7(0x153);
}
function setUnmuteButton() {
  const _0x67eb88 = _0x29ac21;
  document[_0x67eb88(0x152)](_0x67eb88(0x154))[_0x67eb88(0x17c)] =
    "\x0a\x20\x20\x20\x20<span>Unmute</span>\x0a\x20\x20";
}
function setStopVideoButton() {
  const _0x5dbe53 = _0x29ac21;
  document[_0x5dbe53(0x152)](_0x5dbe53(0x164))[_0x5dbe53(0x17c)] =
    _0x5dbe53(0x16e);
}
function setPlayVideoButton() {
  const _0x357690 = _0x29ac21;
  document[_0x357690(0x152)](".main__video_button")[_0x357690(0x17c)] =
    _0x357690(0x185);
}
function setShareButton() {
  const _0x53261b = _0x29ac21;
  document[_0x53261b(0x152)](_0x53261b(0x183))["innerHTML"] = _0x53261b(0x167);
}
function setStopShareButton() {
  const _0x377361 = _0x29ac21;
  document[_0x377361(0x152)](_0x377361(0x183))[_0x377361(0x17c)] =
    _0x377361(0x14c);
}
function setEmptyPage() {
  const _0x19ddda = _0x29ac21;
  document[_0x19ddda(0x152)](_0x19ddda(0x170))[_0x19ddda(0x17c)] =
    _0x19ddda(0x163);
}
