process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configureMongoose = require('./server/config/mongoose');
const configureExpress = require('./server/config/express');
const configurePassport = require('./server/config/passport');


const db = configureMongoose();
const app = configureExpress(db);
const passport = configurePassport();

app.listen(process.env.SERVER_PORT);

export default app;
