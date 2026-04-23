import { useMemo } from 'react'
import { ContactType } from '@staff-portal/graphql/staff'

import {
  RepresentativeFragment as Representative,
  RepresentativeContactFragment as RepresentativeContact
} from '../../data'

const PHONES_CONTACT_TYPES = [ContactType.PHONE, ContactType.PHONE_WITH_NOTES]

type SortByPrimary = (...args: { primary: boolean }[]) => number

const sortByPrimaryFirst: SortByPrimary = ({ primary: pA }, { primary: pB }) =>
  Number(pB) - Number(pA)

type UseRepPhonesEmails = (
  repOrId: Representative | string
) => [RepresentativeContact[], RepresentativeContact[]]

export const useRepresentativePhonesEmails: UseRepPhonesEmails =
  representativeOrId => {
    const [phones, emails] = useMemo(() => {
      if (typeof representativeOrId === 'string') {
        return [[], []]
      }
      const contacts = representativeOrId.contacts.nodes

      return [
        contacts
          .filter(({ type }) => PHONES_CONTACT_TYPES.includes(type))
          .sort(sortByPrimaryFirst),
        contacts
          .filter(({ type }) => type === ContactType.EMAIL)
          .sort(sortByPrimaryFirst)
      ]
    }, [representativeOrId])

    return [phones, emails]
  }
