/**
 * @class Model
 *
 * Manages the data of the application.
 */

class User {
  constructor({ complete, name, email, address, phone } = { complete: false }) {

    this.id = this.uuidv4();
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.complete = complete;
  }

  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}
