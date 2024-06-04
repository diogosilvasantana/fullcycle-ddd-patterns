export interface InputCreateCustomerDto {
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zipcode: string;
  }
}

export interface OutputCreateCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zipcode: string;
  }
}