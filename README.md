# Job Tracker

## Description
Our web application aims to support individuals who are looking for new work. As a one-stop shop for managing job applications, we hope our application will keep job hunting a manageable and enjoyable process.

The Job Tracker web application empowers users to create lists of job application records for various jobs and internships to help users keep track of the numerous applications they’ve submitted while attempting to find new work. Users can login to a personalized account to create job application records and bookkeep all of their previously entered job application records. For each job application, users can track the status of their job application via the Status field - which can be set to “Applied”, “Interview Scheduled”, “Decision Pending”, “Accepted” or “Rejected”.

Each job application can also be associated with a set of skills created by the user, allowing users to measure the frequency of skills across all of their job application records. Users can also indicate the skills they are familiar with, which will be tied to their personalized account, and users can set a comfort rating of 1-to-5 stars for each skill (1 being lowest comfort and 5 being the highest comfort).

Contacts are also another core-concept of the application: users can associate a contact with a job application record if appropriate. Contact details include the contacts name, email address, phone number, and the company the contact works for.

### Technologies Used
To create the Job Tracker web application, we used:
- ReactJS (for front-end UI rendering, routing & stateless logic)
- Typescript (to enforce types with ReactJS)
- Prettier (to format Typescript code implemented on client side)
- MaterialUI (MUI) (for CSS framework)
- Node.js (server environment)
- Express (server-side web application framework)
- PostgreSQL (our database system)
- Docker (to spin up a container that housed the PostgreSQL database)
- Adminer (a rendered UI to help developers administer the data within the database)
- Sequelize (an Object Relational Mapping tool to map our application model entities to the tables in the database)
- JSON Web Tokens (for Authentication and Authorization)
- Node.bcrypt.js (for salting and hashing passwords and password comparison)
- react-query (to cache job application records)
- Git (version control system)
- GitHub (for code repository)
- Heroku (for deployment)

### Development Challenges
About halfway through the project we determined we needed to add a new column in the UserSkills table to capture a users comfort level with a skill they associated to their account, which was missed on our first pass of requirements gathering. Since we then had to figure out how to render a user friendly rating system in the UI so users could rate their comfort level with a particular skill, and we were already through most of the execution phase of the project, our team had to shift its priorities and focus to account for last minute UI feature.

## Installation
### Accessing web (live) deployment
Visit https://job-tracker-capstone-467.herokuapp.com - Please note that this deployment is running on a free instance and might take around 30 seconds to spin up, after which all pages should be accessible at normal speed.

### Local Development Environment
#### Prerequisites
The application requires the following prerequisites in order to run locally:
1. [Node 16.x](https://nodejs.org/en/)
2. [Docker & Docker-Compose](https://www.docker.com/)
3. [Sequelize-CLI (for migrations)](https://sequelize.org/docs/v6/other-topics/migrations/)

#### Getting Started
1. Clone the repository: `git clone https://github.com/adam-osu/job-tracker.git`
2. In the root directory , run `docker-compose up --build` to run PostgreSQL in a Docker container with Adminer (a web app to administer/view the PostgreSQL database accessible at http://localhost:8080)
3. Install the dependencies by running the command `npm install` in the root directory
4. Next we need to run all the database migrations so the PostgreSQL database is setup for our program. You can do this with the command `npx sequelize-cli db:migrate`
5. To turn on the back-end API, run the following command in the root directory: `npm run start:dev`
6. Next we need to get the front-end React/Typescript/Material UI application setup, sp open a second command line window, and within the root directory change to the client directory with the command `cd /client`, then install the UI application dependencies with `npm install`.
7. To start up the front-end UI application, execute `npm run start`. Once the success message appears you should be routed to the home page in your default browser, which is located at http://localhost:3000

## Credits
Team members include: Adam Osaka, Kaewan Gardi, Brayden Murphy, and Michael Stearns.