// console.log('Hello world!');

import { captureAudio, prepareAudio, playAudio } from './audio';

captureAudio().then(prepareAudio).then(playAudio);
