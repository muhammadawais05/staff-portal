import { Maybe } from '@staff-portal/graphql/staff'

const getOptionLabelWithName = ({
  label,
  fullName
}: {
  label: string
  fullName?: Maybe<string>
}) => {
  const basePart = label

  return fullName ? `${basePart} (${fullName})` : basePart
}

export default getOptionLabelWithName
