import {UseQueryOptions} from '@tanstack/react-query';
import {TransactionItemData} from '@utils/contract/transaction';
import {AxiosResponse} from 'axios';

export type TransactionsResponse = Record<string, TransactionItemData>;

export type TResponseSuccess<D> = AxiosResponse<D>;
export type TResponseError<D = unknown> = D;

export type AppUseQueryOptions<
  Res,
  TData = Res,
  ResError = TResponseError,
> = Partial<UseQueryOptions<Res, ResError, TData>>;
