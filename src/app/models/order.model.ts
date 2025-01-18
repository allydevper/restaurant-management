import { Table } from "primeng/table";
import { OrderDetail } from "./orderdetail.model";

export interface Order {
    orderid?: number;
    tableid?: number;
    tables?: Table;
    userid?: number;
    total?: number;
    status?: string;
    createdat?: Date;
    details?: OrderDetail[];
}
