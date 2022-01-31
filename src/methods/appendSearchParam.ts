import { ArrayOptions } from '../types';
import { amendSearchParams } from './shared';

export const appendSearchParam = (
  search: string,
  params: Record<string, any>,
  config?: ArrayOptions
): string => amendSearchParams({ search, params, config });
