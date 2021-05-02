export const VOCABULARY_MODE_DIFFICULT = "difficult"
export const VOCABULARY_MODE_NORMAL = "learn"
export const VOCABULARY_MODE_DELETED = "delete"
export const MODE_VOCABULARY = "vocabulary"
export const MODE_BOOK = "book"
export const WORD_HARD = "hard"
export const WORD_NORMAL = "normal"
export const MODE_DETECT_PATTERN = new RegExp(`(${MODE_BOOK}|${MODE_VOCABULARY})`)

export const TOKEN_EXPIRE_TIME = 4 //hours
export const TOKEN_START_REFRESH = 2 //hours

export const SETTINGS = {
  SERVER: "https://rss-words-3.herokuapp.com",
  AWS_STORE_URL: "https://travel-app-24.s3.eu-north-1.amazonaws.com",
  DEFAULT_IMAGE: "KNPXgyDVUUA4SCWSCCFjJ0c001740dbe0b705441ebf5f9f7c9af0.jpg",
  GROUPS_COUNT: 6,
  PAGES_COUNT: 30,
  DEFAULT_WORD_CHUNK_LENGTH: 20,
}