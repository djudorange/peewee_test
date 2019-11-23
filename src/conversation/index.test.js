const conversation = require('./index');

describe('conversation', () => {
  afterEach(() => {
    conversation.messages.length = 0;
  });

  describe('addMessage', () => {
    it('should add message in messages', () => {
      const req = { body: { message: 'foo' } };
      const res = { send: jest.fn() };
      conversation.addMessage(req, res, () => {});

      expect(conversation.messages.length).toEqual(1);
      expect(conversation.messages[0]).toEqual('foo');
      expect(res.send).toBeCalledWith('message added');
    });
  });

  describe('getMessages', () => {
    it('should skip to next controller', () => {
      const req = { body: { message: 'foo' } };
      const res = { send: jest.fn() };
      const next = jest.fn();

      conversation.getMessages(req, res, next);

      expect(next).toBeCalled();
    });

    it('should return all messages', () => {
      const req = { body: { message: 'SUMMARY' } };
      const res = { send: jest.fn() };
      const next = jest.fn();
      conversation.messages.push('foo');
      conversation.messages.push('bar');

      conversation.getMessages(req, res, next);

      expect(res.send).toBeCalledWith(JSON.stringify(['foo', 'bar']));
    });
  });

  describe('flushMessages', () => {
    it('should skip to next controller', () => {
      const req = { body: { message: 'foo' } };
      const res = { send: jest.fn() };
      const next = jest.fn();

      conversation.flushMessages(req, res, next);

      expect(next).toBeCalled();
    });

    it('should flush all messages', () => {
      const req = { body: { message: 'FLUSH' } };
      const res = { send: jest.fn() };
      const next = jest.fn();
      conversation.messages.push('foo');
      conversation.messages.push('bar');

      conversation.flushMessages(req, res, next);

      expect(conversation.messages.length).toEqual(0);
      expect(res.send).toBeCalledWith('messages flushed');
    });
  });
});
