## overview

This project is an example of how to create basic social networking functionality with React and Google Firebase.

## installation / use

Use create-react-app to create a basic React App.

Create a new web project in Google Firebase. Under "Authentication", turn on email-based authentication.

You can take a look at the "src" folder for how this project was structured, or just copy it in over your Create-React-App source folder.

You must add a file called "FBConfig.js" to the "/src/" folder that creates a default export of your Firebase Configuration variables (you get this from your Firebase console). 

## Features

- User authentication with email/password
- Private and Public routes with ReactRouter v4
- Ability to add other Friends as users and view their public profiles
- A "Main Feed" page that aggregates posts from friends into a single page.
- An ability to create your own posts that friends can view.
