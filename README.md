# Blacklister

CRUD application that manages a database of blacklisted phone numbers

Note: API documentation can be found by running application and visiting localhost:3000/docs

# Technologies Used
- NestJS
- Jest
- Postgresql
- GCP (deployment)
- Docker (CI/CD)
- Postman (testing)

# Design Process
1. Brainstormed basic project structure (e.g routes and deployment structure), chose appropriate technologies for use case, and created Git repository
2. Chose NestJS as backend framework and learned it for the firs time using offical docs and ChatGPT
3. Created basic api routes to handle creation and deletion of objects
4. Integrated database with project, desiged schemas for data, and linked to managed Postgresql database on GCP
5. Created and tested helper function to convert all phone number formats to E.164
6. Deployed project to cloud using Google Cloud Run by containerizing project with Dockerfile
7. Improved Error handling of API routes and integrated Swagger to provide documentation for API routes
8. Tested all API routes using Postman and GCP SQL Studio
9. Finalized project by linting, adding comments, and improving readability of code

# To Run
1. Configure .env to include DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, and DB_DATABASE
2. run `npm install` to download necessary packages
3. run `npm build` to build project
4. run `npm run start:prod` to run project

or Docker it :) (my personal choice but don't forget the .env configuration)
