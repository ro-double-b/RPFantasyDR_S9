const BLOB_SIZE = 16384;

// Reads in the specified file in chunks determined by BLOB_SIZE.
// Repeatedly invokes the specified callback when each successive chunk is read (as an ArrayBuffer).
function readFile(file, callback, offset = 0) {
  const reader = new window.FileReader();

  reader.onload = (e) => {
    callback(e.target.result);
    if (offset + e.target.result.byteLength < file.size) {
      // Read the next chunk as soon as the call stack is clear
      window.setTimeout(readFile, 0, file, callback, offset + BLOB_SIZE);
    }
  };

  const slice = file.slice(offset, offset + BLOB_SIZE);
  reader.readAsArrayBuffer(slice);
}

export default readFile;
