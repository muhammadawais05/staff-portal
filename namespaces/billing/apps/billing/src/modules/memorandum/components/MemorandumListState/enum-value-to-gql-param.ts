/**
 * TODO : export to staff-portal
 *  https://toptal-core.atlassian.net/browse/SPB-1356
 */
export const EnumValueToGqlParam =
  <T>(Enum: T) =>
  (value: unknown) => {
    const val = value as string

    return (
      Enum[val.toUpperCase() as keyof T] ?? Enum[val.toLowerCase() as keyof T]
    )
  }
