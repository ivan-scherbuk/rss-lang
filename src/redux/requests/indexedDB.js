// export const indexedDBRequest = () => {
// 	const request = indexedDB.open("words")
//
// 	request.onupgradeneeded = e => {
// 		const db = e.target.result
// 		const words = db.createObjectStore("words")
// 		const userWords = db.createObjectStore("user_words")
// 	}
//
// 	request.onsuccess = () => {
// 	}
//
// 	request.onerror = () => {
//
// 	}
// }