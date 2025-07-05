import { z as ZOD } from "zod";

export const createAdminSchema = ZOD.object({

 
  email: ZOD.string().email("Invalid email"),
  password: ZOD.string().min(6, "Password must be at least 6 characters"),

});

export type CreateAdminFormData = ZOD.infer<typeof createAdminSchema>;

