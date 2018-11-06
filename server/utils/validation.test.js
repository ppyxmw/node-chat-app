var expect = require("expect");

var {isRealString} = require("./validation");

describe('isRealString', () => {
  it('should reject none string values', () => {
    var res = isRealString(123);
    expect(res).toBeFalse;
  });
  
  it('should reject string with only spaces', () => {
    var res = isRealString("  ");
    expect(res).toBeFalse;
  });
  
  it('should allow string with none space characters', () => {
    var res = isRealString("  123  ");
    expect(res).toBeTrue;
  });
});
