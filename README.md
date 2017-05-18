# Atomic Modules
Mobile Application for independent university module ranking, using open data sources from universities. Build with Ionic and Node+Express.

## How to preview the Mobile App
1. Before starting Cordova and Ionic have to installed as global dependencies `sudo npm install -g cordova ionic`
2. The app uses a Heroku Dynomo as a backend, in case there are problems with communicating with the backend server, set up the server to run localy:
    1. `cd` into /backendAPI
    2. Type `npm install` to install the node dependecies for the backend server
    3. Then type `npm start` to start the backend server
    4. In /MobileApp/src/providers/microservices.ts change the app to use the local server as `let apiUrl = 'http://localhost:8080/api/';`
3. `cd` into /MobileApp and install the ionic dependencies as `npm install`
4. To preview and test the application in the browser, `n /MobileApp type `ionic serve --address 0.0.0.0 --port 8100`
5. Open "http://0.0.0.0:8100/ionic-lab" in the browser to preview the application
6. Initial communication with the server can appear to be slowed down, as Heroku dynamo is put to sleep after some period of inactiviy. But once it is accessed, it will work as expected.
