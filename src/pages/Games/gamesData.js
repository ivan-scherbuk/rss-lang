import {getArrayFromObject} from "../../helpers/gameUtils";

export const GAMES = {
  puzzle:{
    navigationImage: "book.webp",
    key: "puzzle",
    name: "Пазл",
    greetText: "В этой игре необходимо составить предложение из слов, на каждое предложение у вас будет 2 попытки,"+
      " и 30 секунд."
  },
  savannah:{
    navigationImage: "savannah.jpg",
    key: "savannah",
    name: "Саванна",
    greetText: "Тренировка Саванна развивает словарный запас. Выбирайте правильный перевод слова из предложенных."
  },
  audiocall:{
    navigationImage: "audio.jpg",
    key: "audiocall",
    name: "Аудиовызов",
    greetText: "Тренировка Аудиовызов развивает словарный запас. Вы должны выбрать перевод услышанного слова."
  },
  sprint:{
    navigationImage: "sprint.jpg",
    key: "sprint",
    name: "Спринт",
  }
}

export const GAMES_ARRAY = getArrayFromObject(GAMES)
