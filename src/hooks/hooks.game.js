import { useEffect, useState } from "react"


export function useTimer(generateFn, checkInterval = 50, condition = true, ...dependencies){

	useEffect(() => {
		if (condition) {
			const generatorTimer = setInterval(() => {
				generateFn()
			}, checkInterval)
			return (() => clearInterval(generatorTimer))
		}
	}, [...dependencies])
}

export const useTimerGenerator = (fn, generationTimeCount, condition = true, checkInterval = 250) => {

	const [timeToNextGen, setTimeToNextGen] = useState(getGenerationTime(generationTimeCount))
	const [walkCondition, setWalkCondition] = useState(true)

	function getGenerationTime(generationTimeContainer){
		if (Array.isArray(generationTimeContainer)) {
			const minTime = generationTimeContainer[0]
			const maxTime = generationTimeContainer[1]
			return minTime + Math.random() * (maxTime - minTime)
		}
		return generationTimeContainer
	}
	useTimer(() => {
		if (timeToNextGen <= 0 && condition) {
			setTimeToNextGen(getGenerationTime(generationTimeCount))
			fn()
		} else {
			setTimeToNextGen(getGenerationTime(timeToNextGen - checkInterval))
		}
	}, checkInterval, condition && walkCondition, timeToNextGen, condition)

	return {
		reset: () => {
			setTimeToNextGen(0)
		},
		pause: () => {
			setWalkCondition(false)
		},
		play: () => {
			setWalkCondition(true)
		},
		toggle: () => {
			setWalkCondition(!walkCondition)
		},
		getTimeToNextGen: () => {
			return timeToNextGen
		},
	}
}

