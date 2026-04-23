import React from 'react'
import {
  CompanyRepresentativeCommunicationOption as CommunicationOption,
  CompanyRepresentativeCumulativeStatus as CumulativeStatus
} from '@staff-portal/graphql/staff'
import { createRepresentativeFragmentMock as mockRep } from '@staff-portal/client-representatives/src/mocks'

import { wrapComponent } from '../../../../../utils'
import Representative from '../'

export default {
  title: 'Company Profile/Contacts/Representative'
}

export const Main = () =>
  wrapComponent(
    <Representative
      representative={mockRep('1', {
        linkedin: 'http://doot.linked.in/dootmcreppyface',
        main: true
      })}
    />
  )

export const Regular = () =>
  wrapComponent(
    <Representative
      representative={mockRep('1', {
        cumulativeStatus: CumulativeStatus.PENDING_LOGIN,
        communicationOptions: [
          CommunicationOption.NOTIFY_TALENT_RECOMMENDATIONS,
          CommunicationOption.NOTIFY_JOBS,
          CommunicationOption.NOTIFY_OTHER
        ]
      })}
    />
  )

export const Subsidiary = () =>
  wrapComponent(
    <Representative
      isSubsidiary
      representative={mockRep('1', {
        fullName: 'Subsidiary McDescendantface',
        cumulativeStatus: CumulativeStatus.ACTIVE,
        communicationOptions: [CommunicationOption.NOTIFY_JOBS]
      })}
    />
  )

export const Deleted = () =>
  wrapComponent(
    <Representative
      representative={mockRep('1', {
        cumulativeStatus: CumulativeStatus.DELETED,
        callRecordingAccepted: false,
        information: 'Cashed out'
      })}
    />
  )
