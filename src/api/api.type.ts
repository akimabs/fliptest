import {UseQueryOptions} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

export type TransactionsResponse = Record<string, Object>;

export type TResponseSuccess<D> = AxiosResponse<D>;
export type TResponseError<D = unknown> = D;

export type AppUseQueryOptions<
  Res,
  TData = Res,
  ResError = TResponseError,
> = Partial<UseQueryOptions<Res, ResError, TData>>;
