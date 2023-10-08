<div align="center">
    <h1 style="margin: 0;">Mind Your AI: Browser Extension with AI SuperPowers</h1>
    <img src="assets/icon.png" height="250px" >
</div>

Welcome to the <b>Mind Your AI</b> browser extension, designed to enhance your browsing experience by harnessing the capabilities of MindsDB's backend for intelligent predictions. With this extension, you'll have an AI assistant at your fingertips on every web page, accessible with just a keystroke (<kbd>Alt+A</kbd>). Say goodbye to the hassle of switching tabs and copying and pasting content for writing emails and LinkedIn messages.

## 🌟 Exciting Features:

- [X] Context-Aware Queries 🌐🔍
- [X] Gmail Reply and Compose 📚✨
- [X] Quick Access to an AI Assistant 🤖💬
- [X] AI-Generated Social Media Posts 📱📝 (LinkedIn)

## 🌟 Exciting Upcoming Features:

- [ ] Blog Summarization 📚✨
- [ ] Web-Aware Queries 🌐🔍
- [ ] Chatbot Integration 🤖💬
- [ ] PDF Support 📄🔗
- [ ] AI-Generated Social Media Posts 📱📝 (Slack, Twitter, Instagram)
- [ ] Multiple LLM Support 🧠🔗
- [ ] Open Source LLM Integration via Replicate 🌐💡

Stay tuned for these amazing additions! 🚀🌈

## Getting Started

Follow these steps to get started with development:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/parthiv11/Mind-Your-AI
    cd Mind-Your-AI
    ```

2. **Install project dependencies:**

    ```bash
    pnpm install
    # OR
    npm install
    ```

3. **Set up MindsDB:**

   - Visit [cloud.mindsdb.com](https://cloud.mindsdb.com).
   - Copy and paste the following SQL Query in MindsDB Cloud Editor to create a model that will be used for answering queries:

     ```sql
     CREATE MODEL crx_openai
     PREDICT answer
     USING
         engine = 'openai',
         prompt_template = 'Context: {{context}}. Question: {{question}}. Answer:',
         max_tokens = 3900,
         temperature = 0.6;
     ```

4. **Get your session cookie value:**

   - Open the developer tools and navigate to the "Application" tab.
   - Under the "**Storage**" section, click on "**Cookies**."
   - Find the "**session**" cookie and copy its value.

![MindsDB Cookie](https://github.com/parthiv11/Mind-Your-AI/assets/75653580/a53fd40f-d16d-4d79-aaf7-c288d706ffff)

5. **Rename a `.env.example` to `.env` file.**
6. **Paste the session cookie value in the `.env` file:**

   ```dotenv
   MDB_COOKIE=your-session-cookie-value
   ```


7. **Start the development server:**

   ```bash
   pnpm dev
   # OR
   npm run dev
   ```

8. **Load the extension in your browser:**

   - Open your browser and load the appropriate development build. For example, if you are developing for the Chrome browser with manifest v3, use the path: `build/chrome-mv3-dev`.

9. **Use select context from the webpage and press <kbd>Alt+A</kbd> to access AI on any page.**


## Making a Production Build

To create a production-ready bundle for your extension, execute the following command:

```bash
pnpm build
# OR
npm run build
```
To create a production-ready bundle for browsers other than Chrome, you can use the following command. Replace `<browser-name>` with the name of the target browser (e.g., firefox, safari, etc.), and `<manifest-version>` with the appropriate manifest version (most likely, it should be "mv3").

```bash
plasmo build --target=<browser-name>-<manifest-version>
```
- For Firefox, specifically, the command would be:
```bash
plasmo build --target=firefox-mv3
```

This will generate a production bundle that can be zipped and used.


Feel free to reach out to us if you encounter any issues or need further assistance. Happy coding!
