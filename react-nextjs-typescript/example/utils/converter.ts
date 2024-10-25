export type Converter<Input, Output> = {
  (request: Input): Output;
};
