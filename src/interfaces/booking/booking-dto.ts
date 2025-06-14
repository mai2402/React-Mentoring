import { Session } from "../session";





export interface BookingDTO extends Session {
    name: string;
    phone: string;
}