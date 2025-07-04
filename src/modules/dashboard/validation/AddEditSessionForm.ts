


import { z as ZOD } from "zod";



export const sessionSchema = ZOD.object({
  title: ZOD.string().min(3, "Title must be at least 3 characters"),
  summary: ZOD.string().min(10, "Summary must be at least 10 characters"),
  description: ZOD.string().min(15, "Description must be at least 15 characters"),
  duration: ZOD
    .number({
      required_error: "Duration is required",
      invalid_type_error: "Duration must be a number",
    })
    .positive("Duration must be a positive number"),
  date: ZOD.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  ),
  image: ZOD.string().url("Image must be a valid URL").optional().or(ZOD.literal("")),
});


export type AddEditSessionFormData = ZOD.infer<typeof sessionSchema>;

