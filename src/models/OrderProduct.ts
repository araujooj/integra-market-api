// product formatted to orders table

import StockProduct from "./StockProduct";

class OrderProduct {
    id: string;

    product: StockProduct;

    amount: number;

    weight: 'kg' | 'g';

    created_at: Date;

    updated_at: Date;

}

export default OrderProduct;
