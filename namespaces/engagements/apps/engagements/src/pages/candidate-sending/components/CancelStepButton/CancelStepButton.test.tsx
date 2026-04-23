import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Button } from '@toptal/picasso'
import { render } from '@toptal/picasso/test-utils'

import CancelStepButton, { Props } from './CancelStepButton'
import { useCandidateSendingContext } from '../../hooks'

jest.mock('@toptal/picasso', () => ({
  Button: jest.fn()
}))

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

const MockButton = Button as unknown as jest.Mock
const mockUseCandidateSendingContext = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  disabled,
  jobId,
  talentId
}: Props & { jobId?: string; talentId?: string }) => {
  mockUseCandidateSendingContext.mockReturnValue({
    jobId,
    talentId
  })
  MockButton.mockReturnValue(null)

  return render(
    <TestWrapper>
      <CancelStepButton disabled={disabled} />
    </TestWrapper>
  )
}

describe('CancelStepButton', () => {
  const jobId = 'VjEtSm9iLTI4MTk2OQ'
  const talentId = 'VjEtVGFsZW50LTE2MzA2NDk'

  describe('when both `job` and `talent` ids are set', () => {
    it('renders the components', () => {
      renderComponent({
        disabled: false,
        jobId,
        talentId
      })

      expect(MockButton).toHaveBeenCalledWith(
        expect.objectContaining({
          href: '/jobs/281969'
        }),
        {}
      )
    })
  })

  describe('when only `talent` id is set', () => {
    it('renders the components', () => {
      renderComponent({
        disabled: false,
        talentId
      })

      expect(MockButton).toHaveBeenCalledWith(
        expect.objectContaining({
          href: '/talents/1630649'
        }),
        {}
      )
    })
  })

  describe('when both `job` and `talent` ids are not set', () => {
    it('renders the components', () => {
      renderComponent({
        disabled: false
      })

      expect(MockButton).toHaveBeenCalledWith(
        expect.objectContaining({
          href: '/dashboard'
        }),
        {}
      )
    })
  })
})
