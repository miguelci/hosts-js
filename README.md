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

## Api

- The api will be available on http://localhost:5000
- Can make requests with postman or browser

### Endpoints

#### Hosts resources

- **[<code>GET</code> hosts]
- **[<code>POST</code> hosts]

- **[<code>GET</code> hosts/:id]
- **[<code>DELETE</code> hosts/:id]
- **[<code>PUT</code> hosts/:id]

- **[<code>GET</code> hosts/dashboard]

- **[<code>GET</code> hosts/:id/properties]
- **[<code>POST</code> hosts/:id/properties]

- **[<code>GET</code> hosts/:id/properties/:pid]
- **[<code>DELETE</code> hosts/:id/properties/:pid]
- **[<code>PUT</code> hosts/:id/properties/:pid]

- **[<code>GET</code> hosts/:id/properties/:pid/versions]
