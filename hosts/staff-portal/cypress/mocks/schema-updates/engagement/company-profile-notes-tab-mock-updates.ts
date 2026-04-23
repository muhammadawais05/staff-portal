import { ActivityFragment } from '@staff-portal/activities'
import { NoteFragment } from '@staff-portal/notes'

import {
  companyNotesMock,
  defaultDraftJobMock,
  draftJobMock,
  enabledOperationMock
} from '~integration/mocks'
import {
  availableTimezonesMock,
  clientNodeMock,
  staffNodeMock
} from '~integration/mocks/fragments'
import { staffNodeOperationsMock } from '~integration/mocks/fragments/staff-node-mock'

const updateCompanyProfileNotesTabMock = ({
  companyNotes
}: {
  companyNotes: (ActivityFragment | NoteFragment)[]
}) =>
  cy.updateStaffMocks({
    Query: {
      staffNode: () =>
        staffNodeMock({
          claimer: {
            id: 'VjEtU3RhZmYtMTc3NDA0MA',
            __typename: 'Staff'
          },
          draftJobs: {
            nodes: [draftJobMock()]
          },
          defaultDraftJobMock: defaultDraftJobMock(),
          ...staffNodeOperationsMock({
            createSalesDraftJob: enabledOperationMock(),
            approveClient: enabledOperationMock()
          })
        }),
      node: () => ({
        ...clientNodeMock().node(),
        ...companyNotesMock({
          activitiesAndNotes: {
            nodes: companyNotes,
            totalCount: companyNotes.length
          }
        }),
        representatives: {
          totalCount: 0,
          nodes: []
        }
      }),
      availableTimeZones: availableTimezonesMock
    }
  })

export default updateCompanyProfileNotesTabMock
