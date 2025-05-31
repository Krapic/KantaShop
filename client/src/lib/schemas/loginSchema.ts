import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: 'Lozinka mora sadržavati barem 6 znakova'
    })
});

export type LoginSchema = z.infer<typeof loginSchema>;