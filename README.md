## Overview

This project is an example of how to create social networking functionality with React and Google Firebase utilizing Firebase's Real-Time Database and Google's Cloud Functions. In addition, it aims to implement various machine learning algorithms (running on Cloud Functions) to implement recommendation systems, text suggestions, and so on.

## Features

Basic Functionality
- User authentication with email/password (complete)
- Private and Public routes with ReactRouter v4 (complete)
- Ability to add other Friends as users and view their profiles (75%)
- A "Main Feed" page that aggregates posts from friends into a single page. (complete)
- An ability to create your own posts that friends can view.(complete)

Machine Learning Functions (WIP):
- NLP - semantic grading telling whether a post is positive or negative
- NLP - hash-tag suggestion based on language modeling / summarization
- NLP - recommendation engine to determine which posts appear on user's main feed


## Installation / Use

Use create-react-app to create a basic React App.

Create a new web project in Google Firebase. Under "Authentication", turn on email-based authentication.

You can take a look at the "src" folder for how this project was structured, or just copy it in over your Create-React-App source folder.

Dependencies: react-router-dom, firebase, firebase-tools

You must add a file called "FBConfig.js" to the "/src/" folder that creates a default export of your Firebase Configuration variables (you get this from your Firebase console).

# Database structure

/ - Root of database

## /userinfo/{userID}

The userinfo branch contains a set of children, each of which are labeled using the
userID as key. Note that the userinfo branch is seperate from the information that
Firebase Auth keeps to perform CRUD operaitons on users.
Each child contains the following information:
- username (unique to every user)
- email (unique to every user)
- friends - an array of usernames for each friend
- posts - an array of PostIDs that contain the user's posts

## /emailToUser/{email}

The emailToUser branch contains a set of children, each of which is keyed using the unique user emails. Each email key then contains the unique userId for the corresponding user. The point of this is to be able to quickly look up users by email without having to search the entire userinfo branch of the Realtime Database.

Note that in Firebase Realtime Database, you cannot have periods "." in the key value. Thus, emails must be processed in some way to remove periods from the email string. One way to do this would be to use a hash to generate a UID for each email. For this application, we simply used a regular expression to remove all dots and replace them with the string "_DOT_". Whenever you plan on looking up an email, you must remove the dots from the email for this to work.

## /usernameToUser/{username}

Same idea as emailToUser.
TODO: Add schema checking to ensure that the user does not use a username that has periods in it.

## /posts/{userID}/{postID}

/posts/ contains a node for every userID and then creates posts under that userID with keys being Firebase RTDB-generated UIDs.
Each post object contains the following information:
"Subject" - Text containing subject line of message
"Message" - Text containing the main message

The user can add hashtags to anywhere in the message area. Upon uploading, a cloud function processes this information and adds the relevant hashtags to a the hashtags node (see below) and pushes the message's UID under that hashtag node.

## /hashtags/{hashTagID}/

HashtagIDs are formed by performing a hash on the hashtag string.
The node for every hashtagID contains a list of postIDs (possibly userIDs depending on privacy settings of users) that had that hashtag in their post data.
