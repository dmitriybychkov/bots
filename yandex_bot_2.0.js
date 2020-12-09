// ==UserScript==
// @name         Bot for Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @match        https://crushdrummers.ru/*
// @grant        none
// ==/UserScript==

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function getRandom(min,max) { // От min до max, не включая max
    return Math.floor(Math.random() * (max - min) + min);
}

let sites = {
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai": ["Гобой","Флейта","Как звучит флейта","Балалайка","Фагот","Скрипка","Саксофон"],
    "crushdrummers.ru": ["Барабанное шоу","Заказать барабанное шоу в москве","Барабанщики на свадьбу","Барабанщики на корпоратив"]
}

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)];
let words = sites[site];
let word = words[getRandom(0,words.length)];

let yandexInput = document.getElementById('text'); // Поле ввода
let searchButton = document.getElementsByClassName('button mini-suggest__button')[0]; // Кнопка поиска в yandex

if (searchButton != undefined){ // Проверка существования кнопки поиска yandex (Она существует только на главной странице yandex)
    document.cookie = "site=" + site;
    let i = 0;
    let timerId = setInterval(function() {
        yandexInput.value = yandexInput.value + word[i];
        i++;
        if(i == word.length){
            clearInterval(timerId);
            searchButton.click();
        }
    }, 1000);
} else if (location.hostname == "yandex.ru") {
    site = getCookie("site");
    let pageNum;
    let nextButton = document.querySelector('a[aria-label="Следующая страница"]');
    let linkIsFound = false;
    let links = document.links;
    for(let i=0; i<links.length; i++){
        let link = links[i]
        if(link.href.includes(site)){
            setTimeout(()=>{link.click();},1000);
            linkIsFound = true;
            break;
        }
    }
    setTimeout(() => {
        pageNum = document.querySelector('span[aria-label^="Текущая страница"]').innerText;
        if(!linkIsFound && pageNum < 10){
            setTimeout(() => nextButton.click(), 1000)
        }else if (!linkIsFound){
            location.href = "https://yandex.ru/";
        }
    }, 1000);
} else {
    if(getRandom(1, 11) > 8 ) setTimeout(() => { location.href = "https://yandex.ru/"; }, 3000); // С вероятностью в 20% мы переходим на сайт yandex
    let links = document.links; //Собираем коллекцию всех ссылок сайта
    setInterval(()=>{
        let index = getRandom(0, links.length); // Индекс из массива links
        let link = links[index]; // Выбор ссылки по индексу из массива links
        if (link.href.includes(location.hostname)) { // Проверяем что ссылка ведёт нас на тот же сайт на котором мы находимся
            setTimeout(() =>{ link.click(); }, 3000);
        }
    },5000);
}
