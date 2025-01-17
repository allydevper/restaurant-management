import { Table } from "primeng/table";

export interface Order {
    orderid?: number;
    tableid?: number;
    tables?: Table;
    userid?: number;
    total?: number;
    status?: string;
    createdat?: Date;
}
