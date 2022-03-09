# CS 35L Final Project - RateMyResidential
Winter 2022 Web application project for rating and viewing housing ratings around UCLA for CS 35L in UCLA.
The frontend was built with React with Firebase as the backend.

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

Alternatively, you can visit the Firebase-hosted web app link here:
https://l-housing.web.app/


Description:
The idea behind this app was simple, we saw the usefulness of Bruinwalk as a service when selecting classes, particularly
the usefulness of the student perspective, and thought that a central place where thoughts about housing being stored in 
a similar manner would be helpful. It allows the student users to leave reviews for housing in a couple different categories, of which there is more detail in the key features section, and other users can search based off any of the criteria as well as keep their own curated list of housing for ease of use later. The purpose of this is based mostly in the idea that while reddit and other platforms have people talking about it, there is no one consolidated place to see all reviews and opinions.

Key Features:
1) Display Dynamic Data to the User:
    Students will be able to view and add ratings in the form of star ratings and text reviews. The ratings and number of reviews will change as more ratings/reviews come in, allowing a ever growing database to give more and more helpful advice to future students.
2)Upload Data from Client to Back-end:
    Ratings uploaded by users will be saved in the application’s database along with user reviews written with a text form, which will then be consolidated and searchable by the user
3) Meaningfully Search through Server-side Data:  
    Users will be able to search for housing with specific filters (e.g. accessibility to food, proximity to UCLA, parking, access to essentials, noise level).
4) User profiles locked behind google authentication
    User profiles will be done with Google account authentication via Firebase authentication, which allows for individual students to keep a curated list of housing they like for ease of use in the app, and also prevents any flooding of the site by troll reviews since they must have an account associated.
5) Unique Feature #2:
    Users will have a live text search that allows for searching specific housing buildings, this is done so that a student will not have to search through a list if they know exactly what they are looking for and can instead find directly what people think about a specific housing option
Unique Feature #3:  
    Users will be able to save a list of preferred housing arrangements/buildings under their user profiles for ease of access, this was referenced earlier since it is enabled by google authentication, the purpose of this list will be for students who want to prioritize certain housing options on the app but hate UCLA housing app UI which is particularly bad.