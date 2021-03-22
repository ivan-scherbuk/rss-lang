import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getWords } from "../redux/actions"

const initialRequest = {
	group: null,
	page: null,
}

export default function useWords(){
	const dispatch = useDispatch()
	const words = useSelector(state => state.words)
	const [currentWords, setCurrentWords] = useState(null)
	const [currentRequest, setCurrentRequest] = useState(initialRequest)
	const [onLoading, setOnLoading] = useState(false)

	function getWordsChunk(group, page){
		if (words[group] && words[group][page]) {
			setCurrentWords(words[group][page])
			return words[group][page]
		} else {
			dispatch(getWords(group, page))
			setCurrentRequest({group, page})
			setOnLoading(true)
			return "loading"
		}
	}

	useEffect(() => {
		if (words[currentRequest.group] && words[currentRequest.group][currentRequest.page]) {
			setCurrentWords(words[currentRequest.group][currentRequest.page])
			setCurrentRequest(initialRequest)
			setOnLoading(false)
		}
	}, [words])

	return {currentWords, getWordsChunk, onLoading}
}