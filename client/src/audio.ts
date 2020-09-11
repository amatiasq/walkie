export function captureAudio() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export async function playAudio(stream: MediaStream) {
  const audio = prepareAudio(stream);
  await audio.play();
  console.log('playing');
}

function prepareAudio(stream: MediaStream) {
  const audio = document.createElement('audio');
  audio.srcObject = stream;
  document.body.appendChild(audio);
  return audio;
}
