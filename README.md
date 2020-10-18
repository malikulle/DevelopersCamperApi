# DevCamper API

> Backend API for DevCamper application, which is a bootcamp directory website

## Usage

Rename "config/config.env.env" to "config/config.env" and update the values/settings to your own
- Clone this repo
- `npm install` and `cd client` `npm install` to install all required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `config.env` under `./config`
  * Set `MONGO_URI = <YOUR_MONGO_URI>`
  * Set `JWT_SECRET_KEY = <JWT_EXPIRE>`
- `npm run dev` to start the local server.



## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- `config/` - This folder contains configuration for central location environment variables and other configurations.
- `controllers/` - This folder contains Api Controllers.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models .
- `public/` - This folder contains static files for our API.
- `middleware/` - This folder contains middlewares for our API.
- `utils/` - This folder contains helper Functions.
