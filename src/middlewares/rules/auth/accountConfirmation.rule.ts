import { z } from "zod";

const rules = z.object({
    body: z.object({
        token: z.string(),
    }),
});

export default rules;
