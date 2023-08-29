# Mind Your AI 

Welcome to the Brower extension which enhances your browsing experience by utilizing MindsDB's backend capabilities for intelligent predictions. With advanced machine learning models, this extension provides insightful suggestions, optimizing your decision-making within the Chrome browser.


## Getting Started

Follow these steps to get started with development:

1. Clone the repository using `git clone https://github.com/parthiv11/Mind-Your-AI`.
2. Install project dependencies with `pnpm install`.
3. Rename a `.env.example` to `.env` file 
4. Go to cloud.mindsdb.com, open the developer tools, and navigate to the "**Application**" tab.
5. Under the "**Storage**" section, click on "**Cookies**" and find the "plasmo_public" cookie.
6. Copy the value of the "Value" field for the "PLASMO_PUBLIC_COOKIE" cookie.
7. Paste the copied value after the equal sign (=) in the **MDB_COOKIE** line in the `.env` file.

![image](https://github.com/parthiv11/Mind-Your-AI/assets/75653580/a53fd40f-d16d-4d79-aaf7-c288d706ffff)

4. Start the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   ```
5. Open your browser and load the appropriate development build. For example, if you are developing for the Chrome browser with manifest v3, use the path: `build/chrome-mv3-dev`.

6. Use select context from webpage and press <kbd>Alt</kbd> + <kbd>A</kbd> to access AI on any page 


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
3. Add your Plasmo public cookie value to the `.env` file as `PLASMO_PUBLIC_COOKIE=your-cookie-value`.
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open your browser and navigate to `chrome://extensions`.
6. Enable the developer mode.
7. Click on "Load unpacked" and select the project folder. Your extension will be loaded and ready for testing.

Feel free to reach out to us if you encounter any issues or need further assistance. Happy coding!
