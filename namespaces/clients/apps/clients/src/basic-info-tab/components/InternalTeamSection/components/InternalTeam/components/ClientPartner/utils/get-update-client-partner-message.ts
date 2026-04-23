import { getDetails } from './get-details'

interface Params {
  assignee?: string
  companies?: number | null
  opportunities?: number | null
  updated?: boolean
}

export const getUpdateClientPartnerMessage = ({
  assignee,
  companies,
  opportunities,
  updated
}: Params) => {
  const details = getDetails({ companies, opportunities })

  if (updated) {
    return assignee
      ? `${assignee} was assigned as the client partner for ${details}.`
      : `The client partner was also removed for ${details}.`
  }

  return assignee
    ? `This action will also transfer ${details} to ${assignee}.`
    : `The client partner will also be removed for ${details}.`
}
