import mysql from "mysql"

const apiUrl = 'https://cloud.mindsdb.com/api/sql/query';
const mdbCookie = process.env.MDB_COOKIE;
const cookieString = JSON.stringify({ session: mdbCookie });

const fetchData = async (sqlQuery) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieString,
      },
      body: JSON.stringify({
        query: sqlQuery,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data.data;
    } else {
      throw new Error(`Failed to fetch data: ${data.message}`);
    }
  } catch (error) {
    throw error;
  }
};

export const getPrediction = async (question, context) => {
  const MODAL_SQL_QUERY = `
    SELECT answer
    FROM mindsdb.crx_openai
    WHERE question=${mysql.escape(question)}
    and context=${mysql.escape(context)};`;

  try {
    const result = await fetchData(MODAL_SQL_QUERY);
    return result[0]?.[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getLinkedinPrediction = async (post, prompt) => {
  post = post.replace(/'/g, '"');

  const LINK_COMMENT_SQL_QUERY = `
    SELECT answer
    FROM mindsdb.crx_openai
    WHERE post=${mysql.escape(post)}
    AND prompt=${mysql.escape(prompt)}
    USING
        prompt_template = 'Generate short and nice comment for me LinkedIn comment for post:{{post}} as described by me in prompt: {{prompt}}. Answer:',
        max_tokens = 2900,
        temperature = 0.6;`;

  try {
    const result = await fetchData(LINK_COMMENT_SQL_QUERY);
    return result[0]?.[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getGmailPrediction = async (lastReply, prompt) => {
  lastReply = lastReply.replace(/'/g, '"');

  const GMAIL_REPLY_SQL_QUERY = `
    SELECT answer
    FROM mindsdb.crx_openai
    WHERE mail=${mysql.escape(lastReply)}
    AND prompt=${mysql.escape(prompt)}
    USING
        prompt_template = 'Generate short and nice gmail reply for mail received by me:{{mail}} as described by me in prompt: {{prompt}}. Answer:',
        max_tokens = 2900,
        temperature = 0.6;`;

  try {
    const result = await fetchData(GMAIL_REPLY_SQL_QUERY);
    return result[0]?.[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getGmailComposePrediction = async (prompt) => {

  const GMAIL_COMPOSE_SQL_QUERY = `
    SELECT answer
    FROM mindsdb.crx_openai
    WHERE prompt=${mysql.escape(prompt)}
    USING
        prompt_template = 'Draft a nice email as described in prompt: {{prompt}}. Answer:',
        max_tokens = 2900,
        temperature = 0.6;`;

  try {
    const result = await fetchData(GMAIL_COMPOSE_SQL_QUERY);
    return result[0]?.[0] || null;
  } catch (error) {
    throw error;
  }
};