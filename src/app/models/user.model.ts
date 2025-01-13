export interface User {
    userid?: number;
    username: string;
    passwordhash: string;
    role?: string;
    createdat?: Date;
}
