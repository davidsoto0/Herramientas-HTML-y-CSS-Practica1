/**
 * @class Service
 *
 * Manages the data of the application.
 */
class UserService {
  constructor() {
    this.users = (JSON.parse(localStorage.getItem("users")) || []).map(
      user => new User(user)
    );
  }

  bindUserListChanged(callback) {
    this.onUserListChanged = callback;
  }

  _commit(users) {
    this.onUserListChanged(users);
    localStorage.setItem("users", JSON.stringify(users));
  }

  addUser(name, email, address, phone) {
    this.users.push(new User({ name, email, address, phone }));
    this._commit(this.users);
  }

  edit(id, userToEdit) {
    console.log("Longitud: ", userToEdit);
    this.users = this.users.map(user =>
      user.id === id
        ? new User({
          ...user,
          ...userToEdit
        })
        : user
    );
    this._commit(this.users);
  }

  deleteUser(_id) {
    this.users = this.users.filter(({ id }) => id !== _id);

    this._commit(this.users);
  }

  boldUser(_id) {
    this.users = this.users.map(user =>
      user.id === _id ? new User({ ...user, complete: !user.complete }) : user
    );
    this._commit(this.users);
  }
}
