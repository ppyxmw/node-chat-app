class Users {
  constructor () {
    this.array = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room};
    this.array.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);
    
    if (user) {
      this.array = this.array.filter((user) => user.id !== id);
    } 
    return user;
  }
  getUser (id) {
    var user = this.array.filter((user) => user.id === id)[0];

    return user;
  }
  getUserlist (room) {
    var users = this.array.filter((user) => user.room === room);
    // this ES6 loops through every object in the array, refereing to
    // each as user, and if it passes test, it gets added to users
    var namesArray = users.map((user) => user.name);
    // this ES6 loops though and creates a new array
    return namesArray;
  }
  getRoomlist () {
    var roomsArray = (this.array).map((user) => user.room);
    roomsArray = Array.from(new Set(roomsArray));
    return roomsArray;
  }
}

module.exports = {Users};