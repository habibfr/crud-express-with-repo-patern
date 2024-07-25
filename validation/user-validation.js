import z from "zod";

export default class UserValidation{
  static CREATE = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email().max(20)
  })
}
