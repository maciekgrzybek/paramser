import { ArrayOptions } from '../types';
import { amendSearchParams } from './shared';

export const stringifyParams = (
  params: Record<string, any>,
  config?: ArrayOptions
): string => amendSearchParams({ params, config });
