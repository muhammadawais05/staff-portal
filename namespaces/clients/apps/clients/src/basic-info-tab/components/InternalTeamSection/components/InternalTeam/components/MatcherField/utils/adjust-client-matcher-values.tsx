import { UpdateClientMatcherInput } from '@staff-portal/graphql/staff'

const adjustClientMatcherValues = (
  values: Partial<UpdateClientMatcherInput>
) => {
  if (!values?.matcherId) {
    return {
      ...values,
      matcherId: null
    }
  }

  return values
}

export default adjustClientMatcherValues
