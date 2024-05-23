export default class Address {

  _street: string = '';
  _number: number = 0;
  _zipcode: string = '';
  _city: string = '';

  constructor(street: string, number: number, city: string, zipcode: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zipcode = zipcode;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zipcode(): string {
    return this._zipcode;
  }

  get city(): string {
    return this._city;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }

    if (this._number === 0) {
      throw new Error('Number is required');
    }

    if (this._zipcode.length === 0) {
      throw new Error('Zip is required');
    }

    if (this._city.length === 0) {
      throw new Error('City is required');
    }
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._city} - ${this._zipcode}`;
  }

  changeStreet(street: string) {
    this._street = street;
    this.validate();
  }

  changeCity(city: string) {
    this._city = city;
    this.validate();
  }

  changeZip(zipcode: string) {
    this._zipcode = zipcode;
    this.validate();
  }

  changeNumber(number: number) {
    this._number = number;
    this.validate();
  }
}