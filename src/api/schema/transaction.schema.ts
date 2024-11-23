import {z} from 'zod';

export const TransactionItemSchema = z.object({
  account_number: z.string(),
  amount: z.number(),
  beneficiary_bank: z.string(),
  beneficiary_name: z.string(),
  completed_at: z.string(),
  created_at: z.string(),
  fee: z.number(),
  id: z.string(),
  remark: z.string(),
  sender_bank: z.string(),
  status: z.string(),
  unique_code: z.number(),
});

export const TransactionResponseSchema = z.record(
  z.string(),
  TransactionItemSchema,
);

const TransactionRequestSchema = z.object({});

const TransactionAPISchema = {
  Transaction: {
    Request: TransactionRequestSchema,
    Response: TransactionResponseSchema,
  },
};

export default TransactionAPISchema;
