require('./boot-strap');

const startServer = require('./server').default;

startServer(process.env.PORT || 3000);
