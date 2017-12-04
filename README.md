# Hostmaker Exercise

- Rest Api with Node, Express and MySql
- React on the frontend
- Docker to generate the containers

## Requirements
- Docker
- Yarn
- Port 4000 and 5000 not being used

## Usage

```
cd backend/
yarn
cd ../frontend/
yarn
docker-compose build
docker-compose up (or -d)
(wait for it to load everything)
open http://localhost:5000
```

## Tests

- On the backend folder, there is a test for the hosts
```
cd backend/
npm test
```

## Api

- The api will be available on http://localhost:5000
- Can make requests with postman or browser

### Endpoints

#### Hosts resources

- **GET /hosts**
- **POST /hosts**

- **GET/hosts/:id**
- **DELETE/hosts/:id**
- **PUT/hosts/:id**

- **GET/hosts/dashboard**

- **GET/hosts/:id/properties**
- **POST/hosts/:id/properties**

- **GET/hosts/:id/properties/:pid**
- **DELETE/hosts/:id/properties/:pid**
- **PUT/hosts/:id/properties/:pid**

- **GET/hosts/:id/properties/:pid/versions**
