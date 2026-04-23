import React from 'react'
import { render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'

import { OpportunityTypes } from '../../utils/constants'
import OpportunityTeamContainer from './OpportunityTeamContainer'
import OpportunityTeamSection from './components/OpportunityTeamSection'

jest.mock('./components/OpportunityTeamSection')
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useGetNode: jest.fn()
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  defineMessage: jest.fn(),
  useMessageListener: jest.fn()
}))

const useGetNodeMock = useGetNode as jest.Mock
const opportunityTeamSectionMock = OpportunityTeamSection as jest.Mock

const getHookResponse = (type: OpportunityTypes) => () => ({
  data: { type },
  loading: false,
  initialLoading: false
})
const opportunityId = 'testOpportunityId'

describe('Opportunity team', () => {
  describe('when opportunity is loaded', () => {
    beforeEach(() => {
      opportunityTeamSectionMock.mockReturnValue(<div>Team Section</div>)
    })

    it('and has enterprise type', () => {
      useGetNodeMock.mockImplementation(() =>
        getHookResponse(OpportunityTypes.OPPORTUNITY)
      )

      render(<OpportunityTeamContainer opportunityId={opportunityId} />)

      expect(opportunityTeamSectionMock).toHaveBeenCalledTimes(1)
      expect(opportunityTeamSectionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          loading: false,
          initialLoading: false,
          opportunity: { type: OpportunityTypes.OPPORTUNITY }
        }),
        {}
      )
    })

    it('and has project type', () => {
      useGetNodeMock.mockImplementation(() =>
        getHookResponse(OpportunityTypes.PROJECT)
      )

      render(<OpportunityTeamContainer opportunityId={opportunityId} />)

      expect(opportunityTeamSectionMock).toHaveBeenCalledTimes(1)
    })

    it('and has SMB type', () => {
      useGetNodeMock.mockImplementation(() =>
        getHookResponse(OpportunityTypes.SMB)
      )

      const { container } = render(
        <OpportunityTeamContainer opportunityId={opportunityId} />
      )

      expect(opportunityTeamSectionMock).not.toHaveBeenCalled()
      expect(container.firstChild).toBeNull()
    })
  })
})
