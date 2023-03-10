function getLocalStorage() {
  localStorage.getItem('languageBYstatus');
  localStorage.getItem('languageRUstatus');
}

window.addEventListener('load', getLocalStorage);    //// load language value

import birdsData from './birdsData.js';

const mainBlock = document.querySelector('.main');

for (let i = 0; i < birdsData.length; i++) {          //// add html
  for(let j = 0; j < birdsData[i].length; j++) {

    let div = document.createElement('div');

    div.innerHTML = `
    <div class="main__card">
      <img src="" alt="" class="main__card-img" width="200" height="155">
      <span class="main__card-name"></span>
      <span class="main__card-latname"></span>
    </div>
    `;

    mainBlock.appendChild(div);

  }
}

const mainCardImg = document.querySelectorAll('.main__card-img');
const mainName = document.querySelectorAll('.main__card-name');
const mainLatame = document.querySelectorAll('.main__card-latname');


for (let i = 0; i < birdsData.flat().length; i++) {         //// add content
      mainCardImg[i].src = birdsData.flat()[i].image;
      mainLatame[i].textContent = birdsData.flat()[i].species;
      if (localStorage.getItem('languageBYstatus') === 'main__content_laguages-btn active') {
        mainName[i].textContent = birdsData.flat()[i].nameBY;
      } else {
        mainName[i].textContent = birdsData.flat()[i].nameRU;
      }
  }


const mainCard = document.querySelectorAll('.main__card');
const mainDscr = document.querySelector('.main__dscr');
const mainDscrImg = document.querySelector('.main__dscr_img');
const mainDscrName = document.querySelector('.main__dscr_name');
const mainDscrLatName = document.querySelector('.main__dscr_latname');
const mainDscrText= document.querySelector('.main__dscr_text');

const cardAudio = new Audio();

mainCard.forEach((e, i) => {          //// open card dscr
  e.addEventListener('click', () => {
    mainDscr.classList.add('active');
    mainDscrImg.src = birdsData.flat()[i].image;
    mainDscrLatName.textContent = birdsData.flat()[i].species;
    cardAudio.src = birdsData.flat()[i].audio;
    pauseCardAudio.classList.remove('active');
    playCardAudio.classList.remove('none');
    cardAudio.pause();
    isPlay = false;
    if (localStorage.getItem('languageBYstatus') === 'main__content_laguages-btn active') {
      mainDscrName.textContent = birdsData.flat()[i].nameBY;
      mainDscrText.textContent = birdsData.flat()[i].descriptionBY;
    } else {
      mainDscrName.textContent = birdsData.flat()[i].nameRU;
      mainDscrText.textContent = birdsData.flat()[i].descriptionRU;
    }
  });
});

const cross= document.querySelector('.cross');

cross.addEventListener('click', () => {
  mainDscr.classList.remove('active');
  cardAudio.pause();
  isPlay = false;
});

// window.addEventListener('click', (e) => {
//   if(e.target.className != 'active') {
//     mainDscr.classList.remove('active');
//   }
// });

const playCardAudio = document.querySelector('.main__dscr_audio_play');
const pauseCardAudio = document.querySelector('.main__dscr_audio_pause');

playCardAudio.addEventListener('click', () => {
  pauseCardAudio.classList.add('active');
  playCardAudio.classList.add('none');
  playAudio();
});

pauseCardAudio.addEventListener('click', () => {
  pauseCardAudio.classList.remove('active');
  playCardAudio.classList.remove('none');
  playAudio();
});

let isPlay = false;

function playAudio() {
  if (!isPlay) {
    cardAudio.play();
    isPlay = true;
  } else {
    cardAudio.pause();
    isPlay = false;
  }
}

const timeCurrentCardAudio = document.querySelector('.main__dscr_audio_progress_time-start');
const timeEndCardAudio = document.querySelector('.main__dscr_audio_progress_time-end');

timeEndCardAudio.textContent = `00:00`;
timeCurrentCardAudio.textContent = `00:00`;

cardAudio.addEventListener(               //// cards player timer
"loadeddata",
() => {
let allTime = () => {
let min = '00';
let sec = '00';
min = Math.round(Number(cardAudio.duration))/60;
min = min < 10 ? `0${Math.floor(min)}` : Math.floor(min);
sec = Math.round(Number(cardAudio.duration))%60;
sec = sec < 10 ? `0${sec}` : sec;
timeEndCardAudio.textContent = `${min}:${sec}`;
};
allTime();

setInterval(() => {
let min = '00';
let sec = '00';
min = Math.round(Number(cardAudio.currentTime))/60;
min = min < 10 ? `0${Math.floor(min)}` : Math.floor(min);
sec = Math.round(Number(cardAudio.currentTime))%60;
sec = sec < 10 ? `0${sec}` : sec;
timeCurrentCardAudio.textContent = `${min}:${sec}`;
}, 1000);

},
false
);

const timelineCardAudio = document.querySelector('.main__dscr_audio_progress-bar');

timelineCardAudio.addEventListener('click', (e) => {           ////click on timeline to skip around
const timelineWidth = window.getComputedStyle(timelineCardAudio).width;
const timeToSeek = e.offsetX / parseInt(timelineWidth) * cardAudio.duration;
cardAudio.currentTime = timeToSeek;
}, false);

setInterval(() => {                                  ////check audio percentage and update time accordingly
const progressBar = document.querySelector('.main__dscr_audio_progress-bar_percent');
progressBar.style.width = cardAudio.currentTime / cardAudio.duration * 100 + "%";
}, 200);


const volumeCardAudio = document.querySelector('.main__dscr_audio_volume-bar');

volumeCardAudio.addEventListener('click', e => {               //// check volume level
const sliderHeight = window.getComputedStyle(volumeCardAudio).height;
const newVolume = 1 - e.offsetY / parseInt(sliderHeight);
cardAudio.volume = newVolume;
document.querySelector('.main__dscr_audio_volume-bar_percent').style.height =(1 - newVolume) * 100 + '%';
}, false);

cardAudio.addEventListener('ended', function(){
  pauseCardAudio.classList.remove('active');
  playCardAudio.classList.remove('none');
  cardAudio.pause();
  isPlay = false;
});