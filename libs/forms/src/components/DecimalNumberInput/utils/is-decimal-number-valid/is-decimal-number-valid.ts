const VALID_HOURLY_RATE_REGEX = /(^\.(?:\d+)?$)|(^\d{1,11}(?:\.\d+|\.)?$)/

export const isDecimalNumberValid = (value: string) =>
  Boolean(value.match(VALID_HOURLY_RATE_REGEX))
