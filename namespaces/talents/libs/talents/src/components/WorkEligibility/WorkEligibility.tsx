import React, { useMemo } from 'react'
import { ShowMore } from '@toptal/picasso'
import { useUserDateFormatter } from '@staff-portal/current-user'

type TravelVisa = {
  id: string
  expiryDate?: string | null
  visaType: string
  country: {
    id: string
    name: string
  }
}

export interface Props {
  travelVisas: TravelVisa[]
}

const WorkEligibility = ({ travelVisas }: Props) => {
  const userDateFormatter = useUserDateFormatter()
  const visas = useMemo(
    () =>
      travelVisas
        .map(
          ({ visaType, country, expiryDate }: TravelVisa) =>
            `${country.name} - based on ${visaType}${
              expiryDate ? `, expires at ${userDateFormatter(expiryDate)}` : ''
            }`
        )
        .join('\n'),
    [travelVisas, userDateFormatter]
  )

  return (
    <ShowMore rows={3} disableToggle={travelVisas.length <= 3}>
      {visas}
    </ShowMore>
  )
}

export default WorkEligibility
