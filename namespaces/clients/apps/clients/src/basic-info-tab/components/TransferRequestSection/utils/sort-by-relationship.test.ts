import { ClientTransferRoleRequestRelationship } from '@staff-portal/graphql/staff'

import { createTransferRequestMock } from '../data/mocks'
import { sortByRelationship } from './sort-by-relationship'

describe('sortByRelationship', () => {
  it.each([
    {
      initial: [
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.RM
        }),
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.AM
        }),
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.CLAIMER
        })
      ],
      expected: [
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.CLAIMER
        }),
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.AM
        }),
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.RM
        })
      ]
    },
    {
      initial: [
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.CLAIMER
        })
      ],
      expected: [
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.CLAIMER
        })
      ]
    },
    {
      initial: [
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.AM
        }),
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.CLAIMER
        }),
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.RM
        })
      ],
      expected: [
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.CLAIMER
        }),
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.AM
        }),
        createTransferRequestMock({
          relationship: ClientTransferRoleRequestRelationship.RM
        })
      ]
    }
  ])('returns properly sorted array', ({ initial, expected }) => {
    expect(initial.sort(sortByRelationship)).toEqual(expected)
  })
})
