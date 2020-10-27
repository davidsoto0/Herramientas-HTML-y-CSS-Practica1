/**
 * @class View
 *
 * Visual representation of the model.
 */
class UserView {
  constructor() {

    this.insertarUsuario = document.getElementById('addEmployeeModal');
    this.editarUsuario = document.getElementById('editEmployeeModal');
    this.eliminarUsuario = document.getElementById('deleteEmployeeModal');

    //CREAR usuarios
    this.listaParametrosCrear = this.insertarUsuario.getElementsByClassName('form-group');
    this.userNameCreate = this.listaParametrosCrear.item(0).querySelector("input");
    this.userEmailCreate = this.listaParametrosCrear.item(1).querySelector("input");
    this.userAddressCreate = this.listaParametrosCrear.item(2).querySelector("textarea");
    this.userPhoneCreate = this.listaParametrosCrear.item(3).querySelector("input");

    //EDITAR usuarios
    this.listaParametrosEditar = this.editarUsuario.getElementsByClassName('form-group');
    this.userNameEdit = this.listaParametrosEditar.item(0).querySelector("input");
    this.userEmailEdit = this.listaParametrosEditar.item(1).querySelector("input");
    this.userAddressEdit = this.listaParametrosEditar.item(2).querySelector("textarea");
    this.userPhoneEdit = this.listaParametrosEditar.item(3).querySelector("input");

    //ELIMINAR usuarios
    this.listaEliminar = this.eliminarUsuario.getElementsByClassName('modal-footer').item(0);
    this.deleteButton = this.listaEliminar.getElementsByClassName('btn btn-danger').item(0);

    //Botones para CREAR usuarios
    this.createUserButton = this.insertarUsuario.getElementsByClassName('btn btn-success').item(0);
    this.cancelCreateUserButton = this.insertarUsuario.getElementsByClassName('btn btn-default').item(0);

    //Botones para EDITAR usuarios
    this.editUserButton = this.editarUsuario.getElementsByClassName('btn btn-info').item(0);
    this.cancelEditUserButton = this.editarUsuario.getElementsByClassName('btn btn-default').item(0);

    this.tablaUsuarios = document.getElementById('table-user');
    this.listaUsuarios = this.tablaUsuarios.querySelector('tbody');
    //console.log('Lista de usuarios: ', this.listaUsuarios);

    this.app = this.tablaUsuarios.querySelector('tbody');
    this.listUserCheck = [];
  }


  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  get _userNameCreate() {
    return this.userNameCreate.value;
  }

  get _userNameEdit() {
    return this.userNameEdit.value;
  }

  get _userEmailCreate() {
    return this.userEmailCreate.value;
  }

  get _userEmailEdit() {
    return this.userEmailEdit.value;
  }

  get _userAddressCreate() {
    return this.userAddressCreate.value;
  }

  get _userAddressEdit() {
    return this.userAddressEdit.value;
  }

  get _userPhoneCreate() {
    return this.userPhoneCreate.value;
  }

  get _userPhoneEdit() {
    return this.userPhoneEdit.value;
  }

  _resetInputCrear() {
    this.userNameCreate.value = "";
    this.userEmailCreate.value = "";
    this.userAddressCreate.value = "";
    this.userPhoneCreate.value = "";
  }

  _resetInputEditar() {
    this.userNameEdit.value = "";
    this.userEmailEdit.value = "";
    this.userAddressEdit.value = "";
    this.userPhoneEdit.value = "";
  }

  displayUsers(users) {
    // Delete all nodes
    while (this.listaUsuarios.firstChild) {
      this.listaUsuarios.removeChild(this.listaUsuarios.firstChild);
    }
    this.listUserCheck = [];

    if (users.length > 0) {
      // Create nodes
      users.forEach(user => {
        const li = this.createElement('tr');
        li.id = user.id;

        const td = this.createElement('td');
        const checkbox = this.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = user.complete;
        td.append(checkbox);

        const td2 = this.createElement('td');

        //<a href="#editEmployeeModal" class="edit" data-toggle="modal">
        const refEditar = this.createElement('a');
        refEditar.href = "#editEmployeeModal";
        refEditar.className = "edit";
        refEditar.setAttribute("data-toggle", "modal");
        //<i class="material-icons"data-toggle="tooltip" title="Edit"> &#xE254; </i></a> */
        const refEditarI = this.createElement('i');
        refEditarI.className = "material-icons";
        refEditarI.setAttribute("data-toggle", "tooltip");
        refEditarI.title = 'Edit';
        refEditarI.textContent = '✎';

        refEditar.append(refEditarI);
        const deleteButton = this.createElement('button', 'delete');
        deleteButton.title = 'Delete';
        deleteButton.textContent = '✖';

        td2.append(deleteButton, refEditar);

        const spanUser = this.createElement('td');
        const spanEmail = this.createElement('td');
        const spanAddress = this.createElement('td');
        const spanPhone = this.createElement('td');


        //Si se marca el checkbox se pone en negrita la fuente
        if (user.complete) {
          this.listUserCheck.push(user.id);
          const boldName = this.createElement('b');
          boldName.textContent = user.name;
          spanUser.style.color = "red";
          spanUser.append(boldName);

          const boldEmail = this.createElement('b');
          boldEmail.textContent = user.email;
          spanEmail.style.color = "red";
          spanEmail.append(boldEmail);

          const boldAddress = this.createElement('b');
          boldAddress.textContent = user.address;
          spanAddress.style.color = "red";
          spanAddress.append(boldAddress);

          const boldPhone = this.createElement('b');
          boldPhone.textContent = user.phone;
          spanPhone.style.color = "red";
          spanPhone.append(boldPhone);
        } else {
          spanUser.textContent = user.name;
          spanEmail.textContent = user.email;
          spanAddress.textContent = user.address;
          spanPhone.textContent = user.phone;
        }

        li.append(td, spanUser, spanEmail, spanAddress, spanPhone, td2);

        // Append nodes
        this.app.append(li);
      });

    }
  }

  bindAddUserCreate(handler) {
    this.createUserButton.addEventListener("click", event => {
      if (this._userNameCreate && this._userEmailCreate && this._userAddressCreate && this._userPhoneCreate) {
        handler(this._userNameCreate, this._userEmailCreate, this._userAddressCreate, this._userPhoneCreate);
        this._resetInputCrear();
      }
      event.preventDefault();
    });
  }

  bindCancelUserCreate() {
    this.cancelCreateUserButton.addEventListener("click", event => {
      this._resetInputCrear();
      event.preventDefault();

    });
  }

  bindEditUser(handler) {
    var id;
    this.listaUsuarios.addEventListener("click", event => {
      if (event.target.parentNode.className === "edit") {
        id = event.target.parentNode.parentNode.parentElement.id;
      }
    });
    this.editUserButton.addEventListener("click", event => {
      if (this._userNameEdit && this._userEmailEdit && this._userAddressEdit && this._userPhoneEdit) {
        handler(id, { ['name']: this._userNameEdit, ['email']: this._userEmailEdit, ['address']: this._userAddressEdit, ['phone']: this._userPhoneEdit });

        this._resetInputEditar();
      }
      event.preventDefault();
    });
  }

  bindCancelEditUser() {
    this.cancelEditUserButton.addEventListener("click", event => {
      event.preventDefault();

      this._resetInputEditar();
    });
  }

  bindDeleteUser(handler) {
    this.listaUsuarios.addEventListener("click", event => {
      if (event.target.className === "delete") {
        const id = event.target.parentNode.parentElement.id;

        handler(id);
      }
    });
  }

  bindBoldUser(handler) {
    this.listaUsuarios.addEventListener("change", event => {
      if (event.target.type === "checkbox") {
        const id = event.target.parentNode.parentElement.id;
        handler(id);
      }
    });
  }

  //this.cabeceraUsuarios
  /*bindBoldAllUser(handler) {
    this.cabeceraUsuarios.addEventListener("change", event => {
      if (event.target.type === "checkbox") {
        const id = event.target.parentNode.parentElement.id;
        handler(id);
      }
    });
  }*/

  bindDeleteCheckedUser(handler) {
    this.deleteButton.addEventListener("click", event => {
      this.listUserCheck.forEach(function (id) {
        handler(id);
      });
      this.listUserCheck = [];
      event.preventDefault();
    });
  }
}

