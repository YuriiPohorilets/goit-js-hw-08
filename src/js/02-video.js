import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
var throttle = require('lodash.throttle');

const setCurrentTimeUpdate = function (data) {
  const currentTime = data.seconds;

  localStorage.setItem('videoplayer-current-time', currentTime);
};

player.on('timeupdate', throttle(setCurrentTimeUpdate, 1_000));

const getCurrentTimeUpdate = localStorage.getItem('videoplayer-current-time');

if (getCurrentTimeUpdate) {
  player.setCurrentTime(getCurrentTimeUpdate);
}
