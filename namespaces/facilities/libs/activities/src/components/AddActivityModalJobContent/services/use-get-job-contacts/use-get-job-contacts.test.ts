import { renderHook } from '@testing-library/react-hooks'

import { GetAddActivityModalJobFragment } from '../../data/get-add-activity-modal-job-data/get-add-activity-modal-job-data.staff.gql.types'
import useGetJobContacts from './use-get-job-contacts'

describe('useGetJobContacts', () => {
  describe('when `data` equals `null`', () => {
    it('returns empty list', () => {
      const data = null

      const { result } = renderHook(() => useGetJobContacts(data))

      expect(result.current).toStrictEqual([])
    })
  })

  describe('when there is client representative and engagement talent', () => {
    it('returns contacts', () => {
      const data = {
        client: {
          representatives: {
            nodes: [
              {
                id: 'representative-1',
                fullName: 'Irma Zemlak',
                email: 'some@email.com'
              }
            ]
          }
        },
        engagements: {
          nodes: [
            {
              talent: {
                id: 'talent-1',
                fullName: 'Isiah Stamm'
              }
            }
          ]
        }
      }

      const { result } = renderHook(() =>
        useGetJobContacts(data as unknown as GetAddActivityModalJobFragment)
      )

      expect(result.current).toStrictEqual(
        expect.arrayContaining([
          {
            id: 'representative-1',
            fullName: 'Irma Zemlak',
            email: 'some@email.com'
          },
          { id: 'talent-1', fullName: 'Isiah Stamm' }
        ])
      )
    })
  })

  describe('when client representative does not have an email', () => {
    it('returns filtered contacts', () => {
      const data = {
        client: {
          representatives: {
            nodes: [
              {
                id: 'representative-1',
                fullName: 'Irma Zemlak',
                email: 'some@email.com'
              },
              {
                id: 'representative-2',
                fullName: 'Tom Jones'
              }
            ]
          }
        }
      }

      const { result } = renderHook(() =>
        useGetJobContacts(data as unknown as GetAddActivityModalJobFragment)
      )

      expect(result.current).toStrictEqual(
        expect.arrayContaining([
          {
            id: 'representative-1',
            fullName: 'Irma Zemlak',
            email: 'some@email.com'
          }
        ])
      )
    })
  })
})
