import Address from './Address'

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  manager: boolean;

  orders: string;

  address: Address;

  created_at: Date;

  updated_at: Date;
}

export default User;
