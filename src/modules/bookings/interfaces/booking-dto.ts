import { ZodUUID } from "zod/v4";


export interface BookingDTO {
    sessionId?: ZodUUID;
    id?: ZodUUID;
    name: string,
    phone: string,
    title: string,
    summary: string,
    description?: string,
    date: string,
    image?: string,

}

