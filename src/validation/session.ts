import { z  as Zod} from 'zod';



export const sessionSchema = Zod.object({
name: Zod.string()
  .min(1, "Name is required")
  .regex(/^[^\d]+$/, "Name cannot contain numbers"),
  
  phone: Zod
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^\+?\d+$/, "Phone number must be digits"),
});


export type SessionFormData = Zod.infer<typeof sessionSchema>;

  export const loginSchema = Zod.object({
    email: Zod.string().email("Invalid email address"),
     password: Zod.string().min(6, "Password must be at least 6 characters"),
  })

  export type LoginFormData = Zod.infer<typeof loginSchema>