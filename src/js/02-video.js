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

// Сохраняй время воспроизведения в локальное хранилище. Пусть ключом для хранилища будет строка "videoplayer-current-time".
// При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
// Добавь в проект бибилотеку lodash.throttle и сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.
