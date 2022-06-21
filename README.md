# message-board-frontend
This application is the frontend for a practice project. The application is a message board which allows users to register and login, to create and view topics and write messages to discuss the topics with other users. The project includes a pipeline which builds and deploys the app to azure. The webapp can be found hosted on Azure [here](https://brave-island-0ea5f0303.1.azurestaticapps.net/)

[The backend of the project is located here](https://github.com/solita-jasona/practice-message-board-backend)

## Tech Stack
VueJS

## Requirements 
- node (created with node v17.8.0)
- npm  (created with npm v8.5.5)

## Project setup
Clone the repo, then install dependencies:
```
npm install
```
A .env file must be added with variables as shown in the .env.example file. The backend URL for the REST API should be added here.

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

