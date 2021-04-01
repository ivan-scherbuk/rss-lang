import moment from "moment"
import { getUserWords } from "./actions.user"
import { syncUserWords } from "./actions.words"
import { authRequest, tokenRequest, userDataRequest, userSettingsRequest } from "../helpers/requsts.server"
import { LOADING, LOG_OUT, SIGN_IN } from "./types"
import { TOKEN_EXPIRE_TIME, TOKEN_START_REFRESH } from "./config.store"

const setLoading = status => ({type: LOADING, payload: status ?? true})
const setUser = userData => ({type: SIGN_IN, payload: userData})
const unsetUser = () => ({type: LOG_OUT})


const getNextExpireTime = () => moment().add(TOKEN_EXPIRE_TIME, "hours").toISOString()


export function createUser(user){
  return async dispatch => {
    dispatch(setLoading())
    const rawRes = await authRequest("/users", user)
    if (rawRes.ok) {
      dispatch(signIn(user, true))
    } else {
      dispatch(setLoading(false))
    }
  }
}

async function getUserSettings(data, callsCount = 0){
  try{
    const userExistingSettings = await userSettingsRequest(data)
    if(userExistingSettings.ok) {
      const c = await userExistingSettings.json()
      console.log(c)
      return c
    }
    const userNewSettings = await userSettingsRequest({...data, method:"PUT", settings:{optional:{}}})
    if(userNewSettings.ok && callsCount < 3) return await getUserSettings(data, callsCount++)
    else return {}
  } catch(e){
    if(callsCount) console.log(e)
  }

}
//onLoading - when call from another action and don't need to set onLoading one more time
export function signIn(user, onLoading = false){
  return async (dispatch) => {
    if (!onLoading) dispatch(setLoading())
    const rawRes = await authRequest("/signin", user)
    if (rawRes.ok) {
      try {
        const userAuthData = await rawRes.json()
        const userRawData = await userDataRequest({token: userAuthData.token, id: userAuthData.userId})
        const userData = await userRawData.json()
        const userSettings = await getUserSettings({token: userAuthData.token, id: userAuthData.userId})
        userAuthData.tokenExpire = getNextExpireTime()
        const fullUserData = {...userAuthData, ...userData, settings: userSettings, words: {}}
        dispatch(setUser(fullUserData))
        await dispatch(getUserWords())
        await dispatch(syncUserWords())
        localStorage.setItem("userData", JSON.stringify(fullUserData))
      } catch (e) {
        console.log("Error during authentication", e)
      }
    }
    dispatch(setLoading(false))
  }
}

export function logOut(){
  return dispatch => {
    try {
      localStorage.setItem("userData", "{}")
    } catch (e) {
    }
    dispatch(unsetUser())
  }
}

export function checkToken(){
  return async (dispatch, getState) => {
    const {token, id, tokenExpire, refreshToken} = getState().user
    const timeToStartRefresh = moment(tokenExpire).subtract(TOKEN_START_REFRESH, "hours")
    if (moment().isBefore(tokenExpire)) {
      if (moment().isAfter(timeToStartRefresh)) {
        const rawRes = await tokenRequest({token: refreshToken, id})
        const res = await rawRes.json()
        const updateUserData = {
          ...res,
          tokenExpire: getNextExpireTime(),
        }
        localStorage.setItem("userData", JSON.stringify({
          ...JSON.parse(localStorage.getItem("userData")),
          ...updateUserData,
        }))
        dispatch(setUser(updateUserData))
        return updateUserData.token
      }
      return token
    }
    return false
  }
}