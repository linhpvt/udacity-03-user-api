import express from 'express';
import { sequelize } from './sequelize';
import bodyParser from 'body-parser';

import { UserRouter } from './controllers/v0/users/routes/user.router';
import { V0MODELS } from './controllers/v0/model.index';
import { config } from './config/config';

(async () => {
  // set up relationship between models and tables
  await sequelize.addModels(V0MODELS);
  // keep models and tables in synced
  await sequelize.sync();

  const app = express();
  const port = process.env.PORT || 8080; // default port to listen
  
  app.use(bodyParser.json());

  // CORS Should be restricted
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.dev.url);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  });
  
  app.use(UserRouter);

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();