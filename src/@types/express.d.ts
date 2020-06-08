declare namespace Express {
    export interface Request {
        market: {
            id: string;
        },
        pagination: {
            realPage: number;
            realTake: number;
        }
    }
}
