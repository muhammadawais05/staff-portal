export const SingleEnumToGqlParam =
  <T>(Enum: T) =>
  (value: string) =>
    // We need to accommodate different enum types from the GQL schema
    // There might be cases of enums with lowercase keys
    Enum[value.toUpperCase() as keyof T] ?? Enum[value.toLowerCase() as keyof T]

export const EnumToGqlParam =
  <T>(Enum: T) =>
  (value: unknown) =>
    (value as string[])
      .map(val => SingleEnumToGqlParam(Enum)(val))
      .filter(Boolean)
