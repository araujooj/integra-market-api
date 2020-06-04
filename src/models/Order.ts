import User from "./User";
import Supermarket from "./Supermarket";
import OrderProduct from "./OrderProduct";

class Order {
    id: string;

    buyer: User;

    supermarket: Supermarket;

    products: OrderProduct;

    payment_method: 'money' | 'credit_card' | 'home_card';

    status: 'received' | 'separation' | 'street' | 'delivered' | 'problem';

    withdrawl: boolean;

    subtotal: number;

    created_at: Date;

    updated_at: Date;
}

export default Order;
