import {nowPlayVideo} from "../reducers/playingvideo";

export default {
    loading: false,
    users: [], // исходные данные из json
    lang: "ru",
    sortBy: "id",
    sortDir: "asc",
    view: "table", // вид
    term: "", // поисковый запрос
    visibleElements: 15, // выводить кол-во элементов за раз
    lastVisible: 0, // служебный, нужен для выставления задержки анимации
    canAllVideoPlaying: true, // глобальный параметр возможности проигрывания видео
    nowPlayVideo: null, // id пользователя, чьё видео сейчас проигрывается
    lazyUsers: false, // отрисовка данных по новым пользователям
    scrollEndPage: false, // скролл внизу страницы
};
