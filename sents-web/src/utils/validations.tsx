import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(50, { message: 'Password must be at most 50 characters' }),
});

export const registerSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    firstname: z.string().min(2, { message: 'First name must be at least 2 characters' }),
    lastname: z.string().min(2, { message: 'Last name must be at least 2 characters' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(50, { message: 'Password must be at most 50 characters' }),
    password2: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['password2'],
      });
    }
  });

export const categorySchema = z.object({
  category_name: z
    .string()
    .min(2, { message: 'Category name is required and must be at least 2 characters' }),
  category_description: z
    .string()
    .max(255, { message: 'Category description must be at most 255 characters' }),
});

export const metricSchema = z.object({
  metric_name: z
    .string()
    .min(2, { message: 'Metric name is required and must be at least 2 characters' }),
  metric_description: z
    .string()
    .max(255, { message: 'Metric description must be at most 255 characters' }),
});

const isFile = (value: unknown): value is File => {
  return typeof File !== 'undefined' && value instanceof File;
};

export const financialStatementSchema = z.object({
  company_document: z.custom<File>(isFile, {
    message: 'Invalid file',
  }),
});

export const fieldOptions = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  FILE: 'file',
};
