const mediaSource = new MediaSource();

const queue = [];
let current = 0;

// Appends a new data chunk to the queue.
function appendChunk(chunk, video) {
  queue.push(chunk);
  current++;

  if (current === 1) {
    mediaSource.addEventListener('sourceopen', onSourceOpen);
    video.src = window.URL.createObjectURL(mediaSource);
  } else {
    appendNextMediaSegment(mediaSource);
  }

  if (current === 128) {
    video.play();
  }
}

// Event handler for this mediaSource's sourceopen event.
// Must be bound to the sourceopen event.
function onSourceOpen(e) {
  const mediaSrc = e.target;

  if (mediaSrc.sourceBuffers.length > 0) {
    return;
  }

  const sourceBuffer = mediaSrc.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
  const initSegment = new Uint8Array(queue.shift());

  const firstAppendHandler = (event) => {
    const srcbuf = event.target;
    srcbuf.removeEventListener('updateend', firstAppendHandler);

    appendNextMediaSegment(mediaSrc);
  };

  sourceBuffer.addEventListener('updateend', firstAppendHandler);
  sourceBuffer.addEventListener('update', () => { appendNextMediaSegment(mediaSrc); });
  sourceBuffer.appendBuffer(initSegment);
}

function appendNextMediaSegment(mediaSrc) {
  if (mediaSrc.readyState === "closed" || mediaSrc.sourceBuffers[0].updating) {
    return;
  }

  const mediaSegment = new Uint8Array(queue.shift());
  mediaSrc.sourceBuffers[0].appendBuffer(mediaSegment);
}

export default appendChunk;
