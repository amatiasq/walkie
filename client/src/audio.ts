export function captureAudio() {
  return navigator.mediaDevices.getUserMedia({ audio: true });
}

export function prepareAudio(stream: MediaStream) {
  const audio = document.createElement('audio');
  audio.srcObject = stream;
  document.body.appendChild(audio);
  return audio;
}

export function playAudio(audio: HTMLAudioElement) {
  audio.play();
}
