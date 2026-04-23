import { renderHook } from '@testing-library/react-hooks'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { useGetUserVerticals } from '@staff-portal/verticals'

import { useGetClientMatcherFields } from '.'
import { MatcherField } from '../components'

jest.mock('@staff-portal/verticals', () => ({
  ...jest.requireActual('@staff-portal/verticals'),
  useGetUserVerticals: jest.fn()
}))

const useGetUserVerticalsMock = useGetUserVerticals as jest.Mock

describe('useGetClientMatcherFields', () => {
  it('returns Detailed List item with MatcherField component', () => {
    const clientId = 'clientId'
    const vertical = { name: 'developer', talentType: 'developer' }
    const operation = createOperationMock()
    const matcher = {
      node: {
        id: '123',
        role: {
          id: '456',
          fullName: 'some name',
          webResource: {
            text: 'fullName',
            url: 'https://cool.page'
          }
        },
        vertical: {
          id: '123',
          talentType: 'developer'
        }
      },
      handoff: null
    }

    useGetUserVerticalsMock.mockReturnValue({
      data: [vertical]
    })
    const {
      result: { current }
    } = renderHook(() =>
      useGetClientMatcherFields({
        clientId,
        operation,
        value: {
          edges: [matcher]
        }
      })
    )

    expect(current).toMatchObject([
      [
        [
          'developer matcher',
          {
            type: MatcherField,
            props: {
              clientId,
              operation,
              value: matcher,
              vertical
            }
          }
        ]
      ]
    ])
  })
})
