# modules-eval-app
Mobile Application for independent university module ranking, using open data sources from universities. Build with Ionic and Node+Express.

## How to preview the app Mobile App
1. Before starting Cordova and Ionic have to installed as global dependencies `sudo npm install -g cordova ionic`
2. The app uses a Heroku Dynomo as a backend, in case there are problems with communicating with the backend server, set up the server to run localy:
  1. `cd` into /backendAPI
  2. Type `npm install` to install the node dependecies for the backend server
  3. Then type `npm start` to start the backend server
  4. In /MobileApp/src/providers/microservices.ts change the app to use the local server as `let apiUrl = 'http://localhost:8080/api/';`
1. To preview and test the application in the browser, `cd` into /MobileApp and type `ionic serve --address 0.0.0.0 --port 8100`
2. Open "http://0.0.0.0:8100/ionic-lab" in the browser to preview the application
3. Innitial communication with the server can appear to be slowed down, as Heroku dynamo is put to sleep after some period of inactiviy. But once it is accessed, it will work as expected.

## API
Mobile application requires the backend server to be running, cd into /backendAPI and type `npm start`

## Dependencies
Before starting Cordova and Ionic have to installed as global dependencies `sudo npm install -g cordova ionic`

Mobile app and server app require npm depencies to be installed first before running from the package.json, cd into each and type `npm install`
