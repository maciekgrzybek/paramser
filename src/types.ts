export interface GetOptions {
  parseNumbers?: boolean;
  parseBooleans?: boolean;
}

export interface GetAllOptions extends GetOptions {
  keysOnly?: boolean;
  valuesOnly?: boolean;
}

export interface ArrayOptions {
  arrayType?: 'separator' | 'bracket' | 'indexedBracket';
  separator?: string;
}

export interface AmendOptions {
  search?: string;
  params: Record<string, any>;
  config?: ArrayOptions;
}
