export enum DishCategory {
    APPETIZER = 'Appetizer',
    MAIN = 'Main',
    DESSERT = 'Dessert',
    BEVERAGE = 'Beverage'
}

export interface Dish {
    dishId?: number;
    name: string;
    category: DishCategory;
    price: number;
    isAvailable: boolean;
    createdAt?: Date;
}
