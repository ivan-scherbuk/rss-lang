const SERVER = "https://rss-words-3.herokuapp.com"

const getRequestData = (token, method = "GET", body = {}) => {
  const request = {
    method: method || "GET",
    withCredentials: true,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  }
  if (method !== "GET") request.body = JSON.stringify(body)
  return request
}

export async function authRequest(path, user){
  return await fetch(SERVER + path,{
    method: "POST",
    withCredentials: true,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export async function userDataRequest({token, id}){
  return await fetch(`${SERVER}/users/${id}`, getRequestData(token))
}

export async function tokenRequest({token, id}){
  return await fetch(`${SERVER}/users/${id}/tokens`, getRequestData(token))
}

export async function userSettingsRequest({token, id, settings = {}, method = "GET"}){
  return await fetch(`${SERVER}/users/${id}/settings`, getRequestData(token, method, settings))
}

export async function userSettingsRequestWithImage({token, id, data}){
  return await fetch(`${SERVER}/users/${id}/settings/update`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
    body: data
  })
}

export async function userWordsRequest({token, id, method, wordId, word = {}}){
  const request = `${SERVER}/users/${id}/words${wordId? "/" + wordId : ""}`
  const wordToRequest = {...word}
  if(method === "PUT"){
    delete wordToRequest.wordId
    delete wordToRequest.id
  }
  return await fetch(request, getRequestData(token, method, wordToRequest))
}


export async function wordsRequest(group, page){
  return await fetch(`${SERVER}/words?page=${page}&group=${group}`)
}

