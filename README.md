# Mio - Server
RESTful api for Mio-Client 

- [Server Live Link](https://mio-server.herokuapp.com/)
- [Web App Live Link](https://mio-client.vercel.app/)

## Endpoints
- GET `/api/profiles` | _get all profiles_
- POST `/api/profiles` | _add a profile_
- GET `/api/profiles/:id` | _get a specific profile by id_
- PATCH `/api/profiles/:id` | _update a specific profile by id_
- DELETE `/api/profiles/:id` | _delete a specific profile by id_


### Req & Res
- Include `Content-Type: application/json` in header of all requests
- Responses are in JSON format
- Example responses
    - GET `/api/profiles`
        ```JSON
        [
            {
                "id": 36,
                "first_name": "harold",
                "last_name": "kumar",
                "nickname": "whitecastle",
                "image_url": "https://images.generated.photos/qff75ZD-4Q0cR_bcUzIWVUbdbXqcGqpZTOPSo9sBNFI/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAxNjQ0MDRfMDY5/NzQ0MF8wNzQ0MDE1/LmpwZw.jpg",
                "relationship_level": 2,
                "admirable_qualities": "",
                "notes": ""
            },
            {
                "id": 26,
                "first_name": "Kathie",
                "last_name": "O'Conner",
                "nickname": "Kat",
                "image_url": "https://images.generated.photos/KGTxByPqE7LUpg-zBu7m88mylNLzT8tEJSaREJv__vY/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyMjY2ODguanBn.jpg",
                "relationship_level": 4,
                "admirable_qualities": "devoutly optimistic",
                "notes": "dog's name is Sadie"
            },
            ...
        ]
        ```
    - GET `/api/profiles/:id`
        ```JSON
        {
            "id": 26,
            "first_name": "Kathie",
            "last_name": "O'Conner",
            "nickname": "Kat",
            "image_url": "https://images.generated.photos/KGTxByPqE7LUpg-zBu7m88mylNLzT8tEJSaREJv__vY/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zL3Yz/XzAyMjY2ODguanBn.jpg",
            "relationship_level": 4,
            "admirable_qualities": "devoutly optimistic",
            "notes": "dog's name is Sadie"
        }
        ```
## Technologies
Express.js, PostgreSQL, Node.js

## Scripts

- Start the application `npm start`
- Start development server `npm dev`
- Run database migrations `npm run migrate`
- Run test database migrations `npm run migrate:test`
- Deploy to heroku & run migrations `npm run deploy`

## Use / Set-up
- clone repo
- install and audit dependencies, `npm i` & `npm audit fix`
- create psql databases 'mio' and 'mio-test', `createdb mio && createdb mio-test`
- create `.env` file
- configure `.env` : 
    ```
    PORT=[your_dev_port]
    DATABASE_URL='postgresql://postgres@localhost/mio'
    TEST_DATABASE_URL='postgresql://postgres@localhost/mio-test'
    ```
- run database migrations, `npm run migrate && npm run migrate:test`
- Create, test, and ship 😁
---

## Improvement Ideas
- add authentication