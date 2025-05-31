import { z } from "zod";

const passwordValidation = new RegExp(
    /(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
)

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordValidation, {
        message: 'Lozinka mora sadržavati 1 malo slovo, 1 veliko slovo, 1 broj, 1 poseban znak i imati 6-20 znakova'
    })
});

export type RegisterSchema = z.infer<typeof registerSchema>;