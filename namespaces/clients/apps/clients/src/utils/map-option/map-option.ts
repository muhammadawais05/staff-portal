import { InvestigationsStaffSelectOptionFragment } from '../../components/Investigations/data'

export const mapOption = ({
  id,
  fullName
}: InvestigationsStaffSelectOptionFragment) => ({
  value: id,
  text: fullName
})
