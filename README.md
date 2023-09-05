<div align="center">
    <h1 style="margin: 0;">Mind Your AI</h1>
    <img src="assets/icon.png" height="250px" >
</div>
Welcome to the Brower extension which enhances your browsing experience by utilizing MindsDB's backend capabilities for intelligent predictions. It is like AI Assistant on every page in brower with <kbd>Alt+A</kbd>.It facitalte to write mail and linkedIn messages with ai without switxhing tabs and copy paste of context ans answer.

🌟 Exciting  Features:

- [X] Context Aware Queries 🌐🔍
- [X] Gmail Replay and Compose 📚✨
- [X] AI Assistant in just few clicks  🤖💬
- [X] AI-generated Social Media Posts 📱📝 (LinkedIn)

🌟 Exciting Upcoming Features:
- [ ] Blog Summarization 📚✨
- [ ] Web-Aware Queries 🌐🔍
- [ ] Chatbot Integration 🤖💬
- [ ] PDF Support 📄🔗
- [ ] AI-generated Social Media Posts 📱📝 (Slack, X (Twitter),Instagram )
- [ ] Multiple LLM Support 🧠🔗
- [ ] Open Source LLM Integration via Replicate 🌐💡

Stay tuned for these amazing additions! 🚀🌈


## Getting Started

Follow these steps to get started with development:

1. Clone the repository 
 ```bash
 git clone https://github.com/parthiv11/Mind-Your-AI
 cd Mind-Your-AI
 ```
2. Install project dependencies  
```bash
pnpm install
OR
npm install
```
3. Rename a `.env.example` to `.env` file 
4. Go to cloud.mindsdb.com, open the developer tools, and navigate to the "**Application**" tab.
5. Copy Paste this SQL Query in MindsDB Cloud Editor, to create model which will be used in answering Queries
```sql
CREATE MODEL crx_openai
PREDICT answer
USING
    engine = 'openai',
    prompt_template = 'Context: {{context}}. Question: {{question}}. Answer:',
    max_tokens = 3900,
    temperature = 0.6;
```
7. Under the "**Storage**" section, click on "**Cookies**" and find the "**sesion**" cookie and copy it's value.
8. Paste the copied value after the equal sign (=) in the **MDB_COOKIE** line in the `.env` file.

![image](https://github.com/parthiv11/Mind-Your-AI/assets/75653580/a53fd40f-d16d-4d79-aaf7-c288d706ffff)

7. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
8. Open your browser and load the appropriate development build. For example, if you are developing for the Chrome browser with manifest v3, use the path: `build/chrome-mv3-dev`.

9. Use select context from webpage and press <kbd>Alt+A</kbd> to access AI on any page 


## Making a Production Build

To create a production-ready bundle for your extension, execute the following command:

```bash
pnpm build
# or
npm run build
```

This will generate a production bundle that can be zipped and published to various browser stores.

## Installation for Testing

1. Clone the repository using `git clone [repo]`.
2. Install project dependencies with `pnpm install`.
3. Add your Plasmo public cookie value to the `.env` file as `MDB_COOKIE=your-cookie-value`.
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open your browser and navigate to `chrome://extensions`.
6. Enable the developer mode.
7. Click on "Load unpacked" and select the project folder. Your extension will be loaded and ready for testing.

Feel free to reach out to us if you encounter any issues or need further assistance. Happy coding!


