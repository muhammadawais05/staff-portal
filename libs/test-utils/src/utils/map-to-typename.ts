const mapToTypename = <T>(list: T[], __typename: string) =>
  list.map(item => ({ ...item, __typename }))

export default mapToTypename
