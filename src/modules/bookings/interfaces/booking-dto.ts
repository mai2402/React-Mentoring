import { ZodUUID } from "zod/v4";


export interface BookingDTO {
    session_id?: string | ZodUUID;
    id?: string | ZodUUID;
    name: string,
    phone: string,
    sessionTitle?: string;
    sessionSummary?: string;

}

