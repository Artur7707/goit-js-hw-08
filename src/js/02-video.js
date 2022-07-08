import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const savedTime = localStorage.getItem('videoplayer-current-time');

player.on('timeupdate', throttle(onPlay, 1000));
setPlayTime();

function onPlay() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem('videoplayer-current-time', JSON.stringify(seconds));
    })
    .catch(function (error) {
      console.log(error);
    });
}

function setPlayTime() {
  let statTime = 0;
  if (savedTime) {
    statTime = savedTime;
  }
  player.setCurrentTime(statTime).catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;

      default:
        break;
    }
  });
}
