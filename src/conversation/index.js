// Storage (can be replace by a DB)
const messages = [];

/**
 * To add message into the storage
 * @param Object req Request from Express
 * @param Object res Response to Express
 */
function addMessage(req, res) {
  const { message } = req.body;
  messages.push(message);
  res.send('message added');
}

/**
 * To remove all messages from the storage
 * @param Object req Request from Express
 * @param Object res Response to Express
 * @param Function next Next middleware
 */
function flushMessages(req, res, next) {
  const { message } = req.body;
  if (message === 'flush') {
    messages.length = 0;
    res.send('messages flushed');
  } else {
    next();
  }
}

/**
 * To get all messages from the storage
 * @param Object req Request from Express
 * @param Object res Response to Express
 * @param Function next Next middleware
 */
function getMessages(req, res, next) {
  const { message } = req.body;
  if (message === 'summary') {
    res.send(messages.join("\n"));
  } else {
    next();
  }
}

module.exports = {
  addMessage,
  flushMessages,
  getMessages,
  messages,
};
