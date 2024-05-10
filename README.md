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


4. **Start the development server:**

   ```bash
   pnpm dev
   # OR
   npm run dev
   ```

5. **Load the extension in your browser:**

   - Open your browser and load the appropriate development build. For example, if you are developing for the Chrome browser with manifest v3, use the path: `build/chrome-mv3-dev`.

6. **Login With Your MindsDB Credentials and and OpenAI Key**
   ![login](https://github.com/parthiv11/Mind-Your-AI/assets/75653580/666d632e-80a6-4627-88fd-5db5c32d957d)


9. **Now it's Ready to Use, Select context from the webpage and press <kbd>Alt+A</kbd> to access AI on any page.**


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


## Don't have time/mood to read, then watch video for features
https://github.com/parthiv11/Mind-Your-AI/assets/75653580/99aa375e-00d5-48f8-a2dc-92b4eac40abd


Feel free to reach out to us if you encounter any issues or need further assistance. Happy coding!


