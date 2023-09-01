import mysql from "mysql"

const url = "https://cloud.mindsdb.com/api/sql/query"
const cookies = { session: process.env.MDB_COOKIE }
const cookieString = JSON.stringify(cookies)

export const getPrediction = async (question, context) => {
  const MODAL_SQL_QUERY = `
        SELECT answer
        FROM mindsdb.crx_openai
        WHERE question=${mysql.escape(question)}
        and context=${mysql.escape(context)};`
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString
      },
      body: JSON.stringify({
        query: MODAL_SQL_QUERY
      })
    })

    const data = await response.json()
    return data.data[0][0] // Return the data
  } catch (error) {
    throw error // Re-throw the error to be caught higher up
  }
}

export const getLinkedinPrediction = async (post, prompt) => {
  post = post.replace(/'/g, '"');

  const LINK_COMMENT_SQL_QUERY = `
    SELECT answer
    FROM mindsdb.crx_openai
    WHERE post=${mysql.escape(post)}
    AND prompt=${mysql.escape(prompt)}
    USING
        prompt_template = 'Generate and mimic human style  nice comment for LinkedIn post:{{post}}  as decribed in prompt: {{prompt}}.  Answer:',
        max_tokens = 3900,
        temperature = 0.6;;`
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieString
      },
      body: JSON.stringify({
        query: LINK_COMMENT_SQL_QUERY
      })
    })

    const data = await response.json()
    // TODO Handle max token error
    // data.error_message==[openai/crx_openai]: This model's maximum context length is 4097 tokens. However, you requested 4270 tokens (370 in the messages, 3900 in the completion). Please reduce the length of the messages or completion.
    return data.data[0] // Return the data
  } catch (error) {
    throw error // Re-throw the error to be caught higher up
  }
}
