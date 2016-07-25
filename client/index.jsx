import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Peer from 'peerjs';

import App from './components/App.jsx';

const BLOB_SIZE = 16384;

const socket = io();
const peer = new Peer({ key: 'dyf2h2fyul2nvcxr' });

// RTC

let sourceConn;
peer.on('open', (myId) => {
  const params = new URLSearchParams(location.search.slice(1));

  if (params.has('id')) {
    // Connect to existing peer
    const peerId = params.get('id');
    const conn = peer.connect(peerId, { reliable: true });

    conn.on('open', () => {
      document.getElementById('landing').style.display = 'none';
      document.getElementById('link').style.display = 'none';

      console.log('RTC data connection established');
    });

    conn.on('data', (data) => {
      if (typeof data === 'string') {
        console.log(data);
      } else {
        handleChunk(data);
      }
    });
  } else {
    // Act as source
    var guestLink = 'http://localhost:3000/?id=' + myId
    console.log(guestLink);
    var linkDiv = document.getElementById('link')
    linkDiv.innerHTML = '<span id="link-message">Send your friend the following link : ' + guestLink + '</span>'

    peer.on('connection', (conn) => {
      sourceConn = conn;
      document.getElementById('link').style.display = 'none';
    });
  }
});

function sendData(chunk) {
  sourceConn.send(chunk);
}

// FileReader

function readChunk(offset) {
  const files = document.getElementById('files').files;
  const file = files[0];

  if (offset > file.size) {
    console.log('End of file reached');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    continueRead();
  };
  reader.onloadend = function (evt) {
    if (evt.target.readyState === FileReader.DONE) {
      handleChunk(evt.target.result);
      sendData(evt.target.result);
    }
  };

  const blob = file.slice(offset, offset + BLOB_SIZE);
  reader.readAsArrayBuffer(blob);
}

let offset = 0;
function continueRead() {
  readChunk(offset);
  offset += 16384;
}

setTimeout(() => {
  document.querySelector('#start-stream').addEventListener('click', (e) => {
    continueRead();
  });
}, 1000);

// MSE

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', (e) => {
  onSourceOpen(document.querySelector(".video"), e);
});

const queue = [];
let current = 0;

function handleChunk(chunk) {
  queue.push(chunk);
  current++;
  // document.getElementById('chunk-count').innerText = 'Transferred chunks: ' + current;

  const video = document.querySelector(".video");
  if (current === 1) {
    video.src = window.URL.createObjectURL(mediaSource);
    video.pause();
  } else {
    appendNextMediaSegment(mediaSource);
  }

  if (current === 128) {
    video.play();
  }
}

function onSourceOpen(videoElem, e) {
  const ms = e.target;

  if (ms.sourceBuffers.length > 0) {
    console.log("SourceBuffer.length > 0");
    return;
  }

  const sourceBuffer = ms.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
  const initSegment = new Uint8Array(queue.shift());

  const firstAppendHandler = (e) => {
    const srcbuf = e.target;
    srcbuf.removeEventListener('updateend', firstAppendHandler);

    appendNextMediaSegment(ms);
  };

  sourceBuffer.addEventListener('updateend', firstAppendHandler);
  sourceBuffer.addEventListener('update', onProgress.bind(videoElem, ms));
  sourceBuffer.appendBuffer(initSegment);
}

function appendNextMediaSegment(ms) {
  if (ms.readyState === "closed") {
    console.log("ReadyState is closed");
    return;
  }

  if (ms.sourceBuffers[0].updating) {
    return;
  }

  const mediaSegment = new Uint8Array(queue.shift());
  ms.sourceBuffers[0].appendBuffer(mediaSegment);
}

function onProgress(ms, e) {
  appendNextMediaSegment(ms);
}

// ReactDOM

ReactDOM.render(
  <App socket={socket} />,
  document.getElementById('app')
);
