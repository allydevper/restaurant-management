export enum DishCategory {
    APPETIZER = 'Aperitivo',
    MAIN = 'Principal',
    DESSERT = 'Postre',
    BEVERAGE = 'Bebida'
}

export interface Dish {
    dishid?: number;
    name: string;
    category: number;
    price: number;
    isavailable: boolean;
    createdat?: Date;
}
