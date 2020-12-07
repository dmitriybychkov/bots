// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

function getRandom(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}

let yandexInput = document.getElementById('text');
let searchButton = document.getElementsByClassName('button mini-suggest__button')[0]; //Кнопка поиска в Google
let words = ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"];
let word = words[getRandom(0, words.length)];
if (searchButton != undefined){ // Проверка существования кнопки поиска
    let i = 0;
    let timerId = setInterval(function() {
        yandexInput.value = yandexInput.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            searchButton.click();
        }
    }, 1000);
} else {
    let pageNum = document.querySelector('span[aria-label^="Текущая страница"]').innerText;
    let nextButton = document.querySelector('a[aria-label="Следующая страница"]');
    let linkIsFound = false;
    let links = document.links;
    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        if(link.href.includes("xn----7sbab5aqcbiddtdj1e1g.xn--p1ai")){
            setTimeout(() => link.click(), 1000);
            linkIsFound = true;
            break;
        }
    }
    if(!linkIsFound && pageNum < 10){
        setTimeout(() => nextButton.click(), 1000)
    }else if (!linkIsFound){
        location.href = "https://yandex.ru/";
    }
}
