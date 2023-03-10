// change languages

const languageBtnBy = document.querySelector('#by');
const languageBtnRu = document.querySelector('#ru');
const startPlayBtn = document.querySelector('.main__content-btn');
const gallaryBtn = document.querySelector('.main__content-button');

window.addEventListener('load', getLocalStorage);

languageBtnBy.addEventListener('click', () => {         //// change style language btn
    startPlayBtn.textContent = 'Пачаць гульню';
    gallaryBtn.textContent = 'Галерэя';
    languageBtnBy.classList.add ('active');
    languageBtnRu.classList.remove ('active');
    setLocalStorage();

    });

languageBtnRu.addEventListener('click', () => {         //// change style language btn
    startPlayBtn.textContent = 'Начать игру';
    gallaryBtn.textContent = 'Галерея';
    languageBtnBy.classList.remove ('active');
    languageBtnRu.classList.add ('active');
    setLocalStorage();

    });

function setLocalStorage() {
    localStorage.setItem('languageBYstatus', languageBtnBy.className);
    localStorage.setItem('languageRUstatus', languageBtnRu.className);
}

function getLocalStorage() {
    if(localStorage.getItem('languageBYstatus')) {
        languageBtnBy.className = localStorage.getItem('languageBYstatus');
    }

    if(localStorage.getItem('languageRUstatus')) {
        languageBtnRu.className = localStorage.getItem('languageRUstatus');
    }

    if (languageBtnBy.classList.contains('active')) {        //// change language items
        startPlayBtn.textContent = 'Пачаць гульню';          //// BY
    } else {
        startPlayBtn.textContent = 'Начать игру';           //// RU
    }

    if (languageBtnBy.classList.contains('active')) {        //// change language items
        gallaryBtn.textContent = 'Галерэя';          //// BY
    } else {
        gallaryBtn.textContent = 'Галерея';           //// RU
    }
}





