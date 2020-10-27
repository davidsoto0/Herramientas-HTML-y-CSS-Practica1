/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class UserController {
  constructor(service, view) {
    this.service = service;
    this.view = view;

    // Explicit this binding
    this.service.bindUserListChanged(this.onUserListChanged);
    this.view.bindAddUserCreate(this.handleAddUser);
    this.view.bindEditUser(this.handleEditUser);
    this.view.bindDeleteUser(this.handleDeleteUser);
    this.view.bindBoldUser(this.handleBoldUser);
    this.view.bindCancelUserCreate();
    this.view.bindCancelEditUser();
    this.view.bindDeleteCheckedUser(this.handleDeleteUser);

    // Display initial users
    this.onUserListChanged(this.service.users);
  }

  onUserListChanged = users => {
    this.view.displayUsers(users);
  };

  handleAddUser = (_userNameCrear, _userEmailCrear, _userAddressCrear, _userPhoneCrear) => {
    this.service.addUser(_userNameCrear, _userEmailCrear, _userAddressCrear, _userPhoneCrear);
  };

  handleEditUser = (id, user) => {
    this.service.edit(id, user);
  };

  handleDeleteUser = id => {
    this.service.deleteUser(id);
  };

  handleBoldUser = id => {
    this.service.boldUser(id);
  };

}
