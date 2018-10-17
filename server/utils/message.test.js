var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'Michael';
    var text = 'Hello this is Michael';
    var message = generateMessage(from, text);
    
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'Michael';
    var latitude = 3;
    var longitude = 4;
    var url = 'https://www.google.com/maps?q=3,4';
    var message = generateLocationMessage(from, latitude, longitude);
    
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, url});
  });
});