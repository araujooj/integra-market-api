class Address {
    id: string;

    cep: string;

    state: string;

    city: string;

    neighborhood: string;

    street: string;

    number: number;

    complement?: string;

    note?: string;

    created_at: Date;

    updated_at: Date;
}

export default Address;
