const server = "https://rss-words-3.herokuapp.com"

export const authRequest = async (path, user) => {
	return await fetch(server + path, {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
}

export const userDataRequest = async({token, id})=>{
	return await fetch(`${server}/users/${id}`,{
		method: "GET",
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json",
		}
	})
}

export const userWordsRequest = async ({token, id, method, wordId, word = {}}) => {
	let request = `${server}/users/${id}/words`
	if (wordId) request += "/" + wordId
	const requestData = {
		method: method || "GET",
		withCredentials: true,
		headers: {
			"Authorization": `Bearer ${token}`,
			"Accept": "application/json",
			"Content-Type": "application/json",
		}
	}
	if(method !== "GET") requestData.body = JSON.stringify(word)
	return await fetch(request, requestData)
}

export const wordsRequest = async(group, page) => {
	return await fetch(`${server}/words?page=${page}&group=${group}`)
}