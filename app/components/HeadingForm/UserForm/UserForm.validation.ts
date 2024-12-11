import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string(),
    gender: z.string(),
    day: z.string(),
    month: z.string(),
    year: z.string(),
    hour: z.string(),
    mins: z.string(),
    amLich: z.any().optional(),
    namXem: z.string(),
    dateTime: z.date(),
  })
  .superRefine((data, ctx) => {
    if (Number(data.namXem) < Number(data.year)) {
      ctx.addIssue({
        path: ["namXem"],
        code: z.ZodIssueCode.custom,
        message: "Năm xem phải lớn hơn năm sinh",
      });
    }
    if (Number(data.namXem) - 120 > Number(data.year)) {
      ctx.addIssue({
        path: ["namXem"],
        code: z.ZodIssueCode.custom,
        message: `Năm xem không hợp lệ`,
      });
    }
  });
