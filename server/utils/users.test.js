var expect = require("expect");

const {Users} = require("./users");

describe('Users', () => {
  var users;
  
  beforeEach(() => {
    users = new Users;
    users.array = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jane',
      room: 'Node Course'      
    }, {
      id: '3',
      name: 'Ronnie',
      room: 'React Course'
    }];
  });
  
  it('should add a new user', () => {
    var user = {
      id: '4',
      name: 'Michael',
      room: 'Voltage'
    };
    var resUsers = users.addUser(user.id, user.name, user.room);

    expect(users.array[3]).toEqual(user);
  });
  
  it('should find a user', () => {
    var user = users.getUser('2');

    expect(user).toEqual(users.array[1]);
  });
  
  it('should not find a user', () => {
    var user = users.getUser('95');

    expect(user).toBeFalsy();
  });
  
  it('should remove a user', () => {
    var user = users.removeUser('1');

    expect(user.id).toEqual('1');
    expect(users.array.length).toEqual(2);
  });
  
  it('should not remove a user', () => {
    var user = users.removeUser('99');

    expect(user).toBeFalsy();
    expect(users.array.length).toEqual(3);
  });
  
  it('should return names for node course', () => {
    var userList = users.getUserlist('Node Course');

    expect(userList).toEqual(["Mike", "Jane"]);
  });
});