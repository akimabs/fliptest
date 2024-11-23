import {z} from 'zod';
import TransactionAPISchema from '@api/schema/transaction.schema';

export namespace TransactionAPIType {
  export namespace Transaction {
    export type Request = z.infer<
      (typeof TransactionAPISchema)['Transaction']['Request']
    >;
    export type Response = z.infer<
      (typeof TransactionAPISchema)['Transaction']['Response']
    >;
  }
}
