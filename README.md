# Creating a React TypeScript App with Yarn

This guide will walk you through the steps to create a new React application using TypeScript with the help of Yarn package manager.

## Prerequisites

Before you start, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (including npm)
- [Yarn](https://yarnpkg.com/)

## Step 1: Create a New React TypeScript App

Open your terminal and run the following command to create a new React app using Create React App with TypeScript template:

```bash
    yarn create react-app my-react-app --template typescript
Replace my-react-app with the desired name of your React application

## step 2: Navigate to Your Project Directory
Once the project is created, navigate to your project directory:
```bash
     cd my-react-app

## step 3:Install Dependencies
In the project directory, run the following command to install the necessary dependencies:
for using table via mantine labs
    yarn add @mantine/core
    yarn add @mantine/hooks
for using react-dom 
        yarn add @types/react-dom --dev

## step 4:Start the Development Server
To start the development server and view your React application in the browser, run the following command:

```bash
    yarn start
This will open a new tab in your default web browser with the running React app. If it doesn't open automatically, you can visit http://localhost:3000 in your browser.

## step 5: Expected output
![Image of Averagecrop](public/Averagecrop.png)
![Image of mincrop](public/mincrop.png)
![Image of maxmincrop](public/maxcrop.png)
![Image of Maxmincrop](public/maxmincrop.png)





