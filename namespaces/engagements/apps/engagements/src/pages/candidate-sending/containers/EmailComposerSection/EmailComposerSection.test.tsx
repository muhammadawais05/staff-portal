import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen, fireEvent } from '@testing-library/react'
import { useFormState } from '@toptal/picasso-forms'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import EmailComposerSection, { Props } from './EmailComposerSection'
import { useCandidateSendingContext } from '../../hooks'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: () => ({ change: jest.fn() }),
  useFormState: jest.fn()
}))

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn(),
  useGetPitchEmailPreview: jest.fn()
}))

jest.mock('../../components/EmailComposerFields/EmailComposerFields', () => ({
  __esModule: true,
  default: () => <div data-testid='email-composer-fields' />
}))

jest.mock('../EmailComposerEmailPreview/EmailComposerEmailPreview', () => ({
  __esModule: true,
  default: () => <div data-testid='email-composer-email-preview' />
}))

jest.mock('../TalentCardBuilderButton/TalentCardBuilderButton', () => ({
  __esModule: true,
  default: ({ onComplete }: { onComplete: (pitchData: string) => void }) => (
    <button
      data-testid='talent-card-builder-button'
      onClick={() => onComplete('Hello World')}
    >
      Build Talent Card
    </button>
  )
}))

const useFormStateMock = useFormState as jest.Mock
const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const arrangeTest = ({
  newEngagement,
  talent,
  isPitchTextEnabled = true,
  setStepAttributes = jest.fn()
}: {
  newEngagement?: Props['newEngagement']
  talent?: Props['talent']
  setStepAttributes?: () => void
  isPitchTextEnabled?: boolean
}) => {
  useFormStateMock.mockImplementation(() => ({
    values: {
      pitchText: 'pitch text'
    }
  }))
  useCandidateSendingContextMock.mockImplementation(() => ({
    currentStep: NewEngagementWizardStep.PITCH,
    setStepAttributes
  }))

  return render(
    <TestWrapper>
      <EmailComposerSection
        newEngagement={newEngagement}
        talent={talent}
        isPitchTextEnabled={isPitchTextEnabled}
      />
    </TestWrapper>
  )
}

describe('EmailComposerSection', () => {
  it('renders action buttons', () => {
    arrangeTest({})

    expect(
      screen.queryByTestId('job-specific-resume-button')
    ).not.toBeInTheDocument()
    expect(screen.getByTestId('email-composer-mode-button')).toBeInTheDocument()
  })

  describe('when new engagement resume url is the same as talent resume url', () => {
    it('does not render job specific resume button', () => {
      arrangeTest({
        newEngagement: {
          resumeUrl: 'https://example.com/talent-resume-url'
        },
        talent: {
          resumeUrl: 'https://example.com/talent-resume-url'
        } as Props['talent']
      })

      expect(
        screen.queryByTestId('job-specific-resume-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when new engagement resume url is different from talent resume url', () => {
    it('renders job specific resume button', () => {
      arrangeTest({
        newEngagement: {
          resumeUrl: 'http://example.com/engagement-resume-url'
        },
        talent: {
          resumeUrl: 'https://example.com/talent-resume-url'
        } as Props['talent']
      })

      expect(
        screen.getByTestId('job-specific-resume-button')
      ).toBeInTheDocument()
    })
  })

  describe('when email composer in edit mode', () => {
    it('renders email composer fields', () => {
      arrangeTest({})

      expect(screen.getByTestId('email-composer-fields')).toBeInTheDocument()
      expect(
        screen.queryByTestId('email-composer-email-preview')
      ).not.toBeInTheDocument()
    })

    describe('when clicking on email composer mode button', () => {
      it('sets preview mode and sets updated step attributes', () => {
        const setStepAttributesMock = jest.fn()

        arrangeTest({
          setStepAttributes: setStepAttributesMock
        })

        fireEvent.click(screen.getByTestId('email-composer-mode-button'))

        expect(setStepAttributesMock).toHaveBeenCalledWith(
          NewEngagementWizardStep.PITCH,
          {
            pitchText: 'pitch text'
          }
        )
      })
    })
  })

  describe('when email composer in preview mode', () => {
    it('renders email preview', async () => {
      arrangeTest({})

      fireEvent.click(screen.getByTestId('email-composer-mode-button'))

      expect(
        await screen.findByTestId('email-composer-email-preview')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('email-composer-fields')
      ).not.toBeInTheDocument()
    })

    describe('when clicking on email composer mode button', () => {
      it('sets edit mode and does not set updated step attributes', async () => {
        const setStepAttributesMock = jest.fn()

        arrangeTest({
          setStepAttributes: setStepAttributesMock
        })

        fireEvent.click(screen.getByTestId('email-composer-mode-button'))

        expect(
          await screen.findByTestId('email-composer-email-preview')
        ).toBeInTheDocument()

        expect(setStepAttributesMock).toHaveBeenCalledTimes(1)

        // switching back to edit mode
        fireEvent.click(screen.getByTestId('email-composer-mode-button'))

        // setStepAttributesMock was called only once when we switch to preview mode
        expect(setStepAttributesMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('when talent card builder is created', () => {
      it('shows the preview mode', () => {
        const setStepAttributesMock = jest.fn()

        arrangeTest({
          setStepAttributes: setStepAttributesMock,
          talent: {
            id: '1'
          } as Props['talent']
        })

        fireEvent.click(screen.getByTestId('talent-card-builder-button'))

        expect(setStepAttributesMock).toHaveBeenCalledWith(
          NewEngagementWizardStep.PITCH,
          {
            pitchData: 'Hello World',
            pitchText: 'pitch text'
          }
        )
      })
    })
  })
})
