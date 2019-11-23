jest.mock('express');
const express = require('express');
const app = { use: jest.fn(), post: jest.fn(), listen: jest.fn() };
express.mockReturnValue(app);
express.static = jest.fn(() => 'static');

jest.mock('body-parser');
const bodyParser = require('body-parser');
bodyParser.json = jest.fn(() => 'bodyparser');

jest.mock('cors');
const cors = require('cors');
cors.mockReturnValue('cors');

jest.mock('./conversation');
const conversation = require('./conversation');

const { init } = require('./app');

describe('init', () => {
  it('should init express, add body-parser, add post on /api and listen on 3000', () => {
    init();
    expect(express).toBeCalled();
    expect(app.use).toBeCalledWith('bodyparser');
    expect(bodyParser.json).toBeCalled();
    expect(app.use).toBeCalledWith('cors');
    expect(cors).toBeCalled();
    expect(express.static).toBeCalledWith('./public');
    expect(app.use).toBeCalledWith('static');
    expect(app.post).toBeCalledWith(
      '/api',
      conversation.getMessages,
      conversation.flushMessages,
      conversation.addMessage,
    );
    expect(app.listen.mock.calls[0][0]).toEqual(3000);
  });
});
