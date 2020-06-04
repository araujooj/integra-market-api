import Order from "./Order";
import StockProduct from "./StockProduct";

class Supermarket {
    id: string;

    avatar: string;

    money: number;

    orders?: Order;

    stock: StockProduct;

    created_at: Date;

    updated_at: Date;

}

export default Supermarket;
