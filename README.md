# React Component Editor

This is a small react component editor that is powered by GitHub. It can read a file from a specified GitHub repository, transform it into a JSON object, and then transform that JSON object into a React component.

## Demo 
https://www.loom.com/share/e00e0e2cf92a4001be0590986f7a68ab
https://www.loom.com/share/a23b37f84e3c4734a3c4f380415f5e46

## Installation

To install and run this project locally, follow these steps:

1. Clone this repository to your local machine.
2. Run `npm install` to install the required dependencies.
3. Create a `.env.local` file at the root of the project directory and add the following environment variables:
   - `REPO_URL`: Your GitHub REPO URL.
   - `BASE_URL`: Github baseURL .
   - `NEXT_PUBLIC_FILE_PATH`: path of file .
   - `TOKEN`: github access token .
4. Run `npm dev` to start the development server.

## Usage

To use this project, follow these steps:

1. Open the application in your browser by navigating to `http://localhost:3000`.
2. The component editor will automatically load the file specified in your `.env` file and display it as a JSON object.
3. Edit the JSON object as desired to create your React component.
4. Click the "Save" to save it to github repo.
