# Initial project

- npm init -y

# setup library

- npm install sequelize
- npm install express
- npm install cors
- npm install bcrypt
- npm install tedious
- npm install dotenv
- npm install supertest //unit test
- npm install jest // unit test
- npm install express-oas-generator //swagger api document
- npm install joi // validator
- npm install -g nodemon 
- npm install jsonwebtoken
# swagger

- http://localhost:3001/api-docs


//example create backend api with nodejs express for inventory system , design with oop

```plantuml

@startuml

title Finish Goods Inbound Workflow

|PRODUCTION USER|
start
|WAREHOUSE USER|
|AS400|
|WMS|

|PRODUCTION USER|
:input invoice details on as400 web;

|AS400|
:create case mark;
:export pre information csv;

|WMS|
:receive pre information from csv;

|PRODUCTION USER|
:stick case mark;
:transfer products to warehouse;

|WMS|
:scan case mark for receive and assign location;
:transfer to rack location;
:scan case mark and location;
:update put away;

stop
@enduml

```