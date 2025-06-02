import { z  as Zod} from 'zod';



export const sessionSchema = Zod.object({
  name: Zod.string().min(1, "Name is required"),
  email: Zod.string().email("Invalid email address"),
  phone: Zod
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^\+?\d+$/, "Phone number must be digits"),
});


export type SessionFormData = Zod.infer<typeof sessionSchema>;
