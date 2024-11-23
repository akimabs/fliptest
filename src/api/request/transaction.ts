import {get, withQuery} from '@api/index';
import PostAPISchema from '@api/schema/transaction.schema';
import {TransactionAPIType} from '@api/type/transaction.type';

// for this moment, think this use dotenv(for react native) and improve the native side for better security
const BASE_URL = ' https://recruitment-test.flip.id/';

export const getTransaction = withQuery(
  '/frontend-test',
  (params: TransactionAPIType.Transaction.Request) =>
    get<TransactionAPIType.Transaction.Response>('/frontend-test ', {
      baseURL: BASE_URL,
      params,
    }),
  PostAPISchema.Transaction.Response,
);