import Server from "./server";

const server = new Server();


server.start( () => {
    console.log(`server on port ${server.app.get('port')}`);
});