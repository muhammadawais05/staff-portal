import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Talent,
  TalentSpecializationApplicationStatus,
  SpecializationApplicationOperations,
  Specialization,
  Staff,
  SpecializationApplication,
  SpecializationConnection,
  Link
} from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '.'

const talentSpecializationApplicationsMock = ({
  talent,
  specializationApplication,
  availableSpecialization
}: {
  talent?: Partial<Talent>
  specializationApplication?: Partial<SpecializationApplication>
  availableSpecialization?: Partial<Specialization>
}) =>
  ({
    eligibleForRestoration: true,
    specializationApplications: {
      nodes: [
        {
          id: encodeEntityId('123', 'SpecializationApplication'),
          status: TalentSpecializationApplicationStatus.APPROVED,
          startedAt: '2022-01-29T22:22:06+03:00',
          completedAt: '2022-02-19T18:50:20+03:00',
          rejectNoteTasks: null,
          rejectionReason: null,

          performer: {
            id: encodeEntityId('123', 'Staff'),
            webResource: {
              text: 'Gabriela Mejia',
              url: 'https://staging.toptal.net/platform/staff/staff/1899242',
              __typename: 'Link'
            } as unknown as Link,
            __typename: 'Staff'
          } as unknown as Staff,
          ...specializationApplication,
          operations: {
            id: encodeEntityId('123', 'SpecializationApplicationOperations'),
            convertSpecializationApplication: hiddenOperationMock(),
            rejectSpecializationApplication: hiddenOperationMock(),
            restoreSpecializationApplication: hiddenOperationMock(),
            ...specializationApplication?.operations,
            __typename: 'SpecializationApplicationOperations'
          } as SpecializationApplicationOperations,
          specialization: {
            id: encodeEntityId('456', 'Specialization'),
            title: 'Core',
            ...specializationApplication?.specialization,
            __typename: 'Specialization'
          } as unknown as Specialization,
          __typename: 'SpecializationApplication'
        } as unknown as SpecializationApplication
      ]
    },
    availableSpecializations: {
      nodes: [
        {
          id: encodeEntityId('123', 'Specialization'),
          title: 'Core',
          ...availableSpecialization,
          __typename: 'Specialization'
        } as unknown as Specialization
      ],
      __typename: 'SpecializationConnection'
    } as unknown as SpecializationConnection,
    __typename: 'Talent',
    ...talent
  } as unknown as Talent)

export default talentSpecializationApplicationsMock
