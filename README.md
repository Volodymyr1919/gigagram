# Getting Started with Gigagram

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Instalations:
 - npm i mobx --save
 - npm i mobx-react --save
 - npm i node-sass --save
 - npm i react-router-dom --save
 - npm i react-hook-form --save
 - npm i react-bootstrap --save
 - npm i react-alice-carousel --save
 - npm install react-icons --save
 - npm install @mui/material @emotion/react @emotion/styled --save
 - y
 - npm install @mui/icons-material --save
 - npm install react-material-ui-form-validator --save
 - npm install @mui/joy @emotion/react @emotion/styled --save
 - npm i @mui/joy@5.0.0-alpha.24 --save 
 - npm install @mui/lab --save



## Folder structure:
```
    │ src
    ├── assets
    │   ├── img
    │   ├── video
    ├── pages
    │   ├── partial
    │   │   ├──
    │   │   ├──
    │   │   ├──
    │   ├── private
    │   │   ├── feed
    │   │   ├── myPage
    │   │   ├── postId
    │   │   ├── userPage
    │   ├── public
    │   │   ├── forgot
    │   │   ├── landing
    │   │   ├── notFound
    │   │   ├── signin
    │   │   ├── signup
    │   ├── layouts
    │   │   ├── LayoutNF.js
    │   │   ├── MainLayout.js
    ├── store
    ├── scss
    ├── App.jsx
    └── index.js
```

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Troubleshooting
- Проблема с "eslint/jest": 
    1.) 
    ```
    "scripts": {
    "start": "export SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts start",
    "build": "export SET NODE_OPTIONS=--openssl-legacy-provider && react-scripts build"
    }
    ```
    or
    2.)
    ```
    "scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "build": "react-scripts --openssl-legacy-provider build",
    }
    ```
