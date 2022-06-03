const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Includes environment variables for the port to support local and external deployments
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Triggers the models to sync once the application is started.
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
