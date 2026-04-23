import { isNotNullish } from '@staff-portal/utils'

import { FormValues } from '../../components/InviteNewStaffModalContent/InviteNewStaffModalContent'

const adjustFormValues = ({ teamIds, ...restValues }: FormValues) => ({
  ...restValues,
  teamIds: teamIds?.map(({ node }) => node?.id).filter(isNotNullish)
})

export default adjustFormValues
