import React from "react"
import classesCss from "../BookPage.module.scss";
import SearchButton from "../../../components/Buttons/SearchButton";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setVocabularySearchMenuOpened, setVocabularySearchWord } from "../../../redux/actions.vocabularySearch";

export default function SearchMenu({className}){
  const dispatch = useDispatch()
  const {searchWord, isSearchMenuOpened: isOpen} = useSelector(({vocabularySearch}) => vocabularySearch)

  function menuToggleHandler(){
    dispatch(setVocabularySearchMenuOpened(!isOpen))
    if(isOpen) dispatch(setVocabularySearchWord(""))
  }

  function searchWordHandler({target:{value}}){
    dispatch(setVocabularySearchWord(value))
  }

  return(
    <div className={cx(classesCss.SearchMenu, className)}>
      <SearchButton
        onClick={menuToggleHandler}
        active={isOpen}
      />
      <div
        className={cx(classesCss.PopUpMenu, { [classesCss.Active]: isOpen })}
      >
        <input
          value={searchWord}
          onChange={searchWordHandler}
        />
      </div>
    </div>

  )
}