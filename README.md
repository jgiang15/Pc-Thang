# PC-Thang

- [Survey Bite](https://surveybite.github.io/SurveyBite-Client/)
- [Repositories](https://github.com/orgs/SurveyBite/repositories)

### Overview:
Create and account and create posts for others to see the specs of your PC

### Rules:
You must have an account to begin posting. Create an account using the sign up link.

**_THIS IS A DUMMY APPLICATION. Do not enter real passwords, or passwords you have used anywhere else!_**

Once the account is created: create posts and add specs to them

### Wireframes: 

![WireFrame](./src/images/Wireframe.png)

### ERD: 

![ERD](./src/images/ERD.png)


### User stories: 
- As an unregistered user, I would like to sign up with email and password.
- As a registered user, I would like to sign in with email and password.
- As a signed in user, I would like to change password.
- As a signed in user, I would like to sign out.
- As a signed in user, I would like to create a survey with a title and possible
  answers.
- As a signed in user, I would like to update my survey's title and possible
  answers of a survey.
- As a signed in user, I would like to delete my survey.
- As a signed in user, I would like to see all surveys and its answers.
- As a signed in user, I would like to take a survey.

- As a registered user, I would like to sign in with email and password.


### Technologies Used:

## Front-End:
- Javascript
- React
- HTML/CSS
- Bootstrap
- Axios

## Back-end:
- Javascript
- Express.js
- MongoDB
- Mongoose

### Planning & Problem solving strategies:
- [Gantt Chart](https://docs.google.com/spreadsheets/d/1Po47l2tDUJSaDu5-DrfqIBLSBSBXFROUt6qTkc6Sm70/edit#gid=0)
- [Trello](https://trello.com/b/Tt0mqjCX/surveybite)
- Team meetings before, during, and after classes
- Pair programming
- Instructors' help

### Future goals
- We wanted the users to be able to take a survey multiple times if they want.
- We wanted to have other type of survey questions than just short answer questions. Examples: multiple choice, rating, scale (1-10), true/false
- We started on a home page but did not enough time to finish it. 
- We wanted the users to be able to share their surveys on their social media. 
- We wanted the users to be able to share their social media pages directly on our survey site. 

### API End Points

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| GET    | `/surveys`               | `surveys#index`     |
| POST   | `/surveys`               | `surveys#create`    |
| GET    | `/surveys/:id`           | `surveys#show`      |
| PATCH  | `/surveys/:id`           | `surveys#update`    |
| DELETE | `/surveys/:id`            | `surveys#destroy`   |
| POST   | `/questions`               | `questions#create`    |
| PATCH  | `/questions/:id`           | `questions#update`    |
| DELETE | `/questions/:id`            | `questions#destroy`   |
| GET    | `/responses`               | `responses#index`     |
| POST   | `/responses`               | `responses#create`    |
| GET    | `/responses/:id`           | `responses#show`      |
| PATCH  | `/responses/:id`           | `responses#update`    |
| DELETE | `/responses/:id`            | `responses#destroy`   |


### Team Members' Githubs:

- [Alexsia Avila](https://github.com/avongalie)
- [Hiep Duong](https://github.com/hieppie)
- [Joshua Giang](https://github.com/jgiang15)
- [Rebecca Foltin](https://github.com/rebeccafoltin)