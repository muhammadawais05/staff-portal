import { useMemo } from 'react'

import { GetAddActivityModalJobFragment } from '../../data/get-add-activity-modal-job-data/get-add-activity-modal-job-data.staff.gql.types'

const useGetJobContacts = (data?: GetAddActivityModalJobFragment | null) => {
  const contacts = useMemo(() => {
    if (!data) {
      return []
    }

    const clientRepresentativesContacts =
      data.client.representatives.nodes.filter(item => !!item.email) ?? []
    const engagementContacts = (data.engagements?.nodes ?? [])
      .filter(({ talent }) => !!talent)
      .map(({ talent }) => talent as { id: string; fullName: string })

    return [...clientRepresentativesContacts, ...engagementContacts]
  }, [data])

  return contacts
}

export default useGetJobContacts
