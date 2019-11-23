const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getMessages, flushMessages, addMessage } = require('./conversation');

/**
 * Initialisation of the App with Express
 */
function init() {
  const app = express();
  app.use(express.static('./public'));
  app.use(bodyParser.json());
  //app.use(cors());
  app.post('/api', getMessages, flushMessages, addMessage);

  app.listen(3000, () => {
    console.info('Peewee listening on port 3000! Go on http://localhost:3000');
  });
}

module.exports = { init };
