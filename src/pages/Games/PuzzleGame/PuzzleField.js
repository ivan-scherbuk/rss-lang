import React from 'react'

//Убрать тэги
//Разбить текст на слова и символы
//для каждого элемента массива создать пустое поле, а символы вписать
//сделать массив только со словами
//сделать маркер текущего слова
//при нажатии на слово из происходит сравнение с со словом по индексу текущего маркера если он верное
//  то в первом массиве слово исчезает а во втором появляется флаг visible маркер увеличивается
// Business was <b>worse</b> this, month than last, month.
// Business was worse this, month than last, month.
export default function PuzzleField({text}){

	const clearText = text.replace(/<\/?\w+>/, "")
	return(
		<div>
		</div>
	)
}