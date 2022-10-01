import { z } from "zod";

const rules = z.object({
    body: z.object({
        email: z.string().email(),
    }),
});

export default rules;
