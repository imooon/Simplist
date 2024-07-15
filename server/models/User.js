import { ObjectId } from 'mongodb';

export default class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static fromDbObject(dbObject) {
    const { _id, username, password } = dbObject;
    return { id: _id.toString(), username, password };
  }

  toDbObject() {
    return {
      username: this.username,
      password: this.password,
    };
  }
}
