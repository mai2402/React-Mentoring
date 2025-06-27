import { z as ZOD } from "zod";

export const createAdminSchema = ZOD.object({

  name: ZOD.string().min(2, "Name is required"),
  email: ZOD.string().email("Invalid email"),
  password: ZOD.string().min(6, "Password must be at least 6 characters"),
  phone: ZOD
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^\+?\d+$/, "Phone number must be digits")
});

export type CreateAdminFormData = ZOD.infer<typeof createAdminSchema>;

