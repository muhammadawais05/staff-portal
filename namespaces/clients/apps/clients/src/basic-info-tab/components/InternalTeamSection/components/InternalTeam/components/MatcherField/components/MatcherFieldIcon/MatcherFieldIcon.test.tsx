import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Tooltip } from '@toptal/picasso'
import { ClientMatcherEdge } from '@staff-portal/graphql/staff'

import MatcherFieldIcon from './MatcherFieldIcon'
import { MatcherFieldTooltipContent } from './components'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: jest.fn()
}))

const tooltipMock = Tooltip as unknown as jest.Mock

describe('MatcherFieldIcon', () => {
  beforeEach(() => {
    tooltipMock.mockReturnValueOnce(null)
  })

  describe('when client matcher is passed', () => {
    it('renders link', () => {
      const fullName = 'Érico Sabino'
      const handoffName = 'Janis Rutherford'
      const value = {
        node: {
          id: 'VjEtQ2xpZW50TWF0Y2hlci04MjU0Mg',
          role: {
            id: 'VjEtU3RhZmYtMTgxMjUzMg',
            webResource: {
              text: fullName,
              url: 'https://staging.toptal.net/platform/staff/staff/1812532'
            }
          }
        },
        handoff: {
          fullName: handoffName
        }
      }

      render(<MatcherFieldIcon value={value as ClientMatcherEdge} />)

      expect(tooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: expect.objectContaining({
            type: MatcherFieldTooltipContent,
            props: {
              temporaryRecruiterFullName: handoffName,
              primaryRecruiterFullName: fullName
            }
          })
        }),
        {}
      )
    })
  })

  describe('when client matcher is undefined', () => {
    it('does not render tootlip', () => {
      render(<MatcherFieldIcon value={undefined} />)

      expect(tooltipMock).toHaveBeenCalledTimes(0)
    })
  })
})
