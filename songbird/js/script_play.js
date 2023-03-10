function getLocalStorage() {
    localStorage.getItem('languageBYstatus');
    localStorage.getItem('languageRUstatus');
}

window.addEventListener('load', getLocalStorage);    //// load language value

import birdsData from './birdsData.js';

const questionsBlock = document.querySelectorAll('.main__questions_block');
let numberBlockQuestions = 0;
const qestionBlockRU = ['Разминка', 'Воробьиные', 'Лесные птицы', 'Певчие птицы', 'Хищные птицы', 'Морские птицы'];
const qestionBlockBY = ['Размінка', 'Вераб`іныя', 'Лясныя птушкі', 'Пявучыя птушкі', 'Драпежныя птушкі', 'Марскія птушкі'];

//// change language

const scoreName = document.querySelector('.header__score-text');
const cardValueDefault = document.querySelector('.main__dscr_default');
const nextBtn = document.querySelector('.footer-btn');
const nameBirds = document.querySelectorAll('.main__birds_item-text');

if (localStorage.getItem('languageBYstatus') === 'main__content_laguages-btn active') {
  scoreName.textContent = 'Колькасць балаў:';
  cardValueDefault.textContent = 'Праслухайце аўдыё i абярыце адзiн з варыянтаў адказу';
  nextBtn.textContent = 'Настунае пытанне';
} else {
  scoreName.textContent = 'Количество баллов:';
  cardValueDefault.textContent = 'Прослушайте аудио и выберите один из вариантов ответа';
  nextBtn.textContent = 'Следующий вопрос';
}

//// random number

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let numberRandomBird = getRandomNum(0, 5);

//// ////

const nameBirdsBtn = document.querySelectorAll('.main__birds_item');

//// add birds list

function birdsList () {
  if (localStorage.getItem('languageBYstatus') === 'main__content_laguages-btn active') {
    for (let i = 0; i < questionsBlock.length; i++) {
        questionsBlock[i].textContent = qestionBlockBY[i];
        if (questionsBlock[i].classList.contains('active')) {
            for (let j = 0; j < nameBirds.length; j++) {
                nameBirds[j].textContent = birdsData[i][j].nameBY;
            }
        }
    }
  } else {
    for (let i = 0; i < questionsBlock.length; i++) {
        questionsBlock[i].textContent = qestionBlockRU[i];
        if (questionsBlock[i].classList.contains('active')) {
          for (let j = 0; j < nameBirds.length; j++) {
              nameBirds[j].textContent = birdsData[i][j].nameRU;
          }
      }
    }
  }
}
birdsList ();

////random player
const playRandomAudio = document.querySelector('.main__random_audio_play');
const pauseRandomAudio = document.querySelector('.main__random_audio_pause');

playRandomAudio.addEventListener('click', () => {
  pauseRandomAudio.classList.add('active');
  playRandomAudio.classList.add('none');
  playMainAudio();
});

pauseRandomAudio.addEventListener('click', () => {
  pauseRandomAudio.classList.remove('active');
  playRandomAudio.classList.remove('none');
  playMainAudio();
});

const randomAudio = new Audio();
let isPlay = false;
randomAudio.src = birdsData[numberBlockQuestions][numberRandomBird].audio;
function playMainAudio() {
  if (!isPlay) {
    randomAudio.play();
    isPlay = true;
  } else {
    randomAudio.pause();
    isPlay = false;
  }
}

const timeCurrentRandomAudio = document.querySelector('.main__random_audio_progress_time-start');
const timeEndRandomAudio = document.querySelector('.main__random_audio_progress_time-end');

randomAudio.addEventListener(               //// random players timer
  "loadeddata",
  () => {
    let allTime = () => {
      let min = '00';
      let sec = '00';
      min = Math.round(Number(randomAudio.duration))/60;
      min = min < 10 ? `0${Math.floor(min)}` : Math.floor(min);
      sec = Math.round(Number(randomAudio.duration))%60;
      sec = sec < 10 ? `0${sec}` : sec;
      timeEndRandomAudio.textContent = `${min}:${sec}`;
    };
    allTime();

    setInterval(() => {
      let min = '00';
      let sec = '00';
      min = Math.round(Number(randomAudio.currentTime))/60;
      min = min < 10 ? `0${Math.floor(min)}` : Math.floor(min);
      sec = Math.round(Number(randomAudio.currentTime))%60;
      sec = sec < 10 ? `0${sec}` : sec;
      timeCurrentRandomAudio.textContent = `${min}:${sec}`;
     }, 1000);

  },
  false
);

nameBirdsBtn.forEach((e, i) => {          //// stop random audio after win
  e.addEventListener('click', () => {
    if(numberRandomBird === i) {
      pauseRandomAudio.classList.remove('active');
      playRandomAudio.classList.remove('none');
      randomAudio.pause();
      isPlay = false;
    }
  });
});

const timelineRandomAudio = document.querySelector('.main__random_audio_progress-bar');

timelineRandomAudio.addEventListener('click', (e) => {           ////click on timeline to skip around
  const timelineWidth = window.getComputedStyle(timelineRandomAudio).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * randomAudio.duration;
  randomAudio.currentTime = timeToSeek;
}, false);

setInterval(() => {                                  ////check audio percentage and update time accordingly
  const progressBar = document.querySelector('.main__random_audio_progress-bar_percent');
  progressBar.style.width = randomAudio.currentTime / randomAudio.duration * 100 + "%";
}, 200);

const volumeRandomAudio = document.querySelector('.main__random_audio_volume-bar');

volumeRandomAudio.addEventListener('click', e => {               //// check volume level
  const sliderHeight = window.getComputedStyle(volumeRandomAudio).height;
  const newVolume = 1 - e.offsetY / parseInt(sliderHeight);
  console.log(newVolume);
  randomAudio.volume = newVolume;
  document.querySelector('.main__random_audio_volume-bar_percent').style.height =(1 - newVolume) * 100 + '%';
}, false);

randomAudio.addEventListener('ended', function(){
  pauseRandomAudio.classList.remove('active');
  playRandomAudio.classList.remove('none');
  randomAudio.pause();
  isPlay = false;
});

//// bird cards

const cardImg = document.querySelector('.main__dscr_img');
const cardName = document.querySelector('.main__dscr_name');
const cardLatName = document.querySelector('.main__dscr_latname');

const cardText = document.querySelector('.main__dscr_text');
const cardMainBlock = document.querySelector('.main__dscr_wrapper');
const cardAudio = new Audio();
const cardCorrectAudio = new Audio();
const cardErrorAudio = new Audio();
function playGame(){
  nameBirdsBtn.forEach((e, i) => {
    e.addEventListener('click', () => {

      if(numberRandomBird === i) {        //// add correct name instead of *** and correct img

        cardCorrectAudio.src = '../../assets/audio_correct.mp3';
        cardCorrectAudio.play();
        randomImg.src = birdsData[numberBlockQuestions][i].image;
        if (localStorage.getItem('languageBYstatus') === 'main__content_laguages-btn active') {
          randomName.textContent = birdsData[numberBlockQuestions][i].nameBY;
        } else {
          randomName.textContent = birdsData[numberBlockQuestions][i].nameRU;
        }
        footerBtn.classList.add('active');      //// btn next is active
        footerBtn.removeAttribute('disabled');
      } else {
        cardErrorAudio.src = '../../assets/audio_error.mp3';
        cardErrorAudio.play();
      }

      cardText.classList.add ('active');
      cardMainBlock.classList.add ('active');
      cardValueDefault.classList.add ('none');

      cardImg.src = birdsData[numberBlockQuestions][i].image;
      cardLatName.textContent = birdsData[numberBlockQuestions][i].species;
      if (localStorage.getItem('languageBYstatus') === 'main__content_laguages-btn active') {
        cardName.textContent = birdsData[numberBlockQuestions][i].nameBY;
        cardText.textContent = birdsData[numberBlockQuestions][i].descriptionBY;
      } else {
        cardName.textContent = birdsData[numberBlockQuestions][i].nameRU;
        cardText.textContent = birdsData[numberBlockQuestions][i].descriptionRU;
      }

      //// cards player

      const playCardAudio = document.querySelector('.main__dscr_audio_play');
      const pauseCardAudio = document.querySelector('.main__dscr_audio_pause');

      pauseCardAudio.classList.remove('active');
      playCardAudio.classList.remove('none');

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

      cardAudio.pause();
      let isPlay = false;
      cardAudio.src = birdsData[numberBlockQuestions][i].audio;
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

    });
  });
}
playGame();

//// change circle color

const circles = document.querySelectorAll('.main__birds_item-circle');

let circleFlag = false;
function changeCircleColor(){

  nameBirdsBtn.forEach((e, i) => {

    let circleStyle = () => {
      if(circleFlag === true) {
        return;
      }

      if(numberRandomBird === i) {
        circles[i].classList.add('green');
        circleFlag = true;
        return;
      }

      circles[i].classList.add('red');
    };

    e.addEventListener('click', circleStyle);

  });
}
changeCircleColor();


//// score

let score = 0;
let scoreFlag = false;
let scoreText = document.querySelector('.header__score-result');

function getScore() {
  let tempArr = [];
  let mainArr = [0, 1, 2, 3, 4, 5];
  let counter = 0;

  nameBirdsBtn.forEach((e, i) => {
    e.addEventListener('click', () => {

      if(scoreFlag === true) {
        return;
      }

      if(numberRandomBird === i) {
        tempArr.push(i);

        mainArr.forEach(e => {
          if (tempArr.includes(e) === false) {
          counter++;
        }
        });

        score = score + counter;
        scoreText.textContent = ` ${score}`;
        scoreFlag = true;
        tempArr = [];
        counter = 0;
        return;
      } else {
        tempArr.push(i);
      }
    });
  });
}

getScore();

//// secret bird block

const randomName = document.querySelector('.main__random-name');
const randomImg = document.querySelector('.main__random-img');

//// next qestions block

const footerBtn = document.querySelector('.footer-btn');

const endGameBlock = document.querySelector('.end-game');
const container = document.querySelector('.container');

footerBtn.addEventListener('click', () => {

  numberBlockQuestions++;

  numberRandomBird = getRandomNum(0, 5);

  pauseRandomAudio.classList.remove('active');    //// reset random player
  playRandomAudio.classList.remove('none');
  randomAudio.pause();
  cardAudio.pause();
  isPlay = false;

  footerBtn.classList.remove('active');                 //// reset footer btn
  footerBtn.setAttribute('disabled', 'disabled');

  randomName.textContent = '*******';                   //// reset secret bird
  randomImg.src = 'https://birds-quiz.netlify.app/static/media/bird.06a46938.jpg';

  questionsBlock.forEach((e, i) => {                    //// add .active for next block
    if (numberBlockQuestions === i) {
      e.classList.add('active');
    } else {
      e.classList.remove('active');
    }
  });

  birdsList ();                                        //// add new bird list

  cardText.classList.remove ('active');                //// reset bird card
  cardMainBlock.classList.remove ('active');
  cardValueDefault.classList.remove ('none');

  circles.forEach(e => {                    //// reset circle color
    e.classList.remove('red');
    e.classList.remove('green');
  });
  circleFlag = false;

  scoreFlag = false;        //// reset counter flag

  if (numberBlockQuestions === 5){
    if (localStorage.getItem('languageBYstatus') === 'main__content_laguages-btn active') {
      nextBtn.textContent = 'Вынiк';
    } else {
      nextBtn.textContent = 'Результат';
    }
  }

  if (numberBlockQuestions === 6) {
    container.classList.add('none');
    endGameBlock.classList.add('active');

    endGame();
  }

  randomAudio.src = birdsData[numberBlockQuestions][numberRandomBird].audio;

});


function endGame() {
  const winText = document.querySelector('.text');
  const winBtn = document.querySelector('.button');

  if (localStorage.getItem('languageBYstatus') === 'main__content_laguages-btn active') {
      winBtn.textContent = 'Паспрабаваць яшчэ';
      if (score == 30) {
          winText.textContent = `Вы атрымалi максiмальную колькасць балаў - вы выдатны знаўца птушыных спеваў! Віншуем!`;
      } else {
          winText.textContent = `Вы атрымалi ${score} балаў. Нядрэнны вынiк, але можна паспрабаваць яшчэ`;
      }
    } else {
      winBtn.textContent = 'Попытаться ещё';
      if (score == 30) {
          winText.textContent = `Вы получили максимальное количество баллов - вы большой знаток птичьего пения! Поздравляем!`;
      } else {
          winText.textContent = `Вы получили ${score} баллов. Неплохой результат, но можно попытаться ещё`;
      }
    }
}

