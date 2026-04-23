import { useMemo } from 'react'
import {
  CompanyRepresentativeBillingCommunicationOption as BillingCommOpts,
  CompanyRepresentativeCreationMethod
} from '@staff-portal/graphql/staff'

import {
  CreateRepresentativeFormValues,
  EditRepresentativeFormValues
} from '../RepresentativeForm'
import { RepresentativeFragment } from '../../../data'
import { useRepresentativePhonesEmails } from '../../../services'

type UseInitialRepresentativeValues = (
  clientIdOrRepresentative: string | RepresentativeFragment
) => CreateRepresentativeFormValues | EditRepresentativeFormValues

const useInitialRepresentativeValues: UseInitialRepresentativeValues =
  clientIdOrRepresentative => {
    const [phones, emails] = useRepresentativePhonesEmails(
      clientIdOrRepresentative
    )

    return useMemo(() => {
      // we don't have a representative passed, only clientId as string
      // so we're creating a new rep
      if (typeof clientIdOrRepresentative === 'string') {
        const formValues: CreateRepresentativeFormValues = {
          billingCommunication: BillingCommOpts.NONE,
          creationMethod: CompanyRepresentativeCreationMethod.NEW,
          email: ''
        }

        return formValues
      }

      // we have an existing rep
      const representative = clientIdOrRepresentative

      const { jobsWithBillingNotification } = representative

      const email = emails[0]?.value

      // pick phone contact props for phones array editor
      const phoneArrayInputs = phones?.map(
        ({ id, phoneCategory, value, primary }) => ({
          id,
          phoneCategory,
          value,
          primary
        })
      )

      const billingCommunicationJobIds =
        jobsWithBillingNotification?.nodes?.map(({ id }) => id)

      const languageIds = representative.languages?.nodes?.map(
        ({ id, name }) => ({ text: name, value: id })
      )

      const editFormValues: EditRepresentativeFormValues = {
        fullName: representative.fullName,
        position: representative.position,
        linkedin: representative.linkedin,
        information: representative.information,
        about: representative.about,
        phoneNumberNotes: representative.phoneNumberNotes,
        twitter: representative.twitter,
        zoominfoProfile: representative.zoominfoProfile,
        skype: representative.skype,
        timeZoneName: representative.timeZone?.value,

        phones: phoneArrayInputs,

        languageIds,

        location: {
          countryId: representative.location?.country?.id,
          cityName: representative.location?.cityName
        },

        billingCommunication: representative.billingCommunication,
        communication: representative.communicationOptions,

        portalEnabled: representative.portalEnabled ? 'true' : 'false',
        readBillingReport: representative.readBillingReport ? 'true' : 'false',

        email,
        billingCommunicationJobIds
      }

      return editFormValues
    }, [clientIdOrRepresentative, phones, emails])
  }

export default useInitialRepresentativeValues
