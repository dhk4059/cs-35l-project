# RateMyResidential - CS 35L Final Project (Winter 2022)
A web application project for viewing and rating/reviewing on-campus residential dorms and dining halls in UCLA.
The frontend was built with React with Firebase as the backend for the database, user
authentication, and hosting.

## Instructions on installing and running the app:

Make sure node.js is installed, and if not, install it here:
https://nodejs.org/en/

Make sure git is also installed, and if not, install it here:
https://git-scm.com/downloads

Once Node.js is installed, run the following commands in terminal in order:
1) git clone https://github.com/dkwack4059/cs-35l-project.git
2) cd cs-35l-project
3) npm install
4) npm start

This series of commands will clone the github repository to your local machine
and install the necessary node modules to run a localhost of the web app. 
The api key and config needed to call the Firebase database are included during 
**git clone**, so you can simply run **npm start** immediately.

Alternatively, you can visit the Firebase-hosted web app link here:
https://l-housing.web.app/


## Description

Similar to how Bruinwalk is a service for selecting classes and professors, particularly
through a student-community perspective, this app serves as a service for rating/reviewing on-campus housing and dining halls in UCLA. Users are able to leave reviews for housing and dining halls in their respective different categories, and other users can search for housing as well as keep their own curated list of housing for ease of use later. The purpose of this app is also based on the fact that while platforms such as Reddit have students talking about housing and dining halls, there is no one consolidated place to see all reviews and ratings.


## Key Features

Key features as mentioned in the project assignment spec.

### 1) Display Dynamic Data to the User:

Users will be able to view and add ratings in the form of star ratings and text reviews. The ratings and number of reviews will change as more ratings/reviews come in, allowing a ever growing database to give more and more helpful advice to future students. Furthermore, users who log in can generate multiple lists of preferred housing that they might like. Some pages will display different elements based on whether a user is logged in or not.
    
### 2) Upload Data from Client to Back-end:

Ratings for dorms and dining halls uploaded by users will be saved in the application’s database along with user reviews written with a text form. The preferred housing lists created/modified by users will also be uploaded/called by and from the database.
    
### 3) Meaningfully Search through Server-side Data: 

Users will be able to order housing buildings via specific filters (e.g. accessibility to food, proximity to UCLA, parking, access to essentials, noise level). Not only that, but users can also look up housing names through the search bar, where clicking a result takes the user to the building's page. Due to the small number of dining halls, we decided to limit search options to housing, as searching/making a list of preferred housing holds far more weight than making a small list of preferred dining halls.
    
### 4) Unique Feature #1:

User profiles will be done with email/password authentication via Firebase authentication, which allows for individual students to keep a curated list of housing they like for ease of use in the app, and also prevents any flooding of the site by troll reviews, as users must have an account in order to leave a review. Any user, logged in or not, however, will be able to view the pages in this application.
    
### 5) Unique Feature #2:

Users will have a live text search that allows for searching specific housing buildings, this is done so that a student will not have to search through a list if they know exactly what they are looking for and can instead find directly what people think about a specific housing option. On the review side of the application, users can submit a text review, a review of ratings (i.e. rating from 1-5), or both for both housing and dining halls.
    
### 6) Unique Feature #3:  

Users will be able to save a list of preferred housing buildings under their user profiles, enabled by google authentication. Users can modify any list that they may have already created, adding or removing items from said list. They can also create new lists, and clicking on any housing name in the list will take the user to a new tab which navigates to that housing name's page.
