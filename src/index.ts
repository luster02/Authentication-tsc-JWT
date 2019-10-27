import Server from "./config/server.config";

const server = new Server();


server.start( () => {
    console.log(`server on port ${server.app.get('port')}`);
});