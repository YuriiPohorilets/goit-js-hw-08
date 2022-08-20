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

player
  .setCurrentTime(getCurrentTimeUpdate)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
