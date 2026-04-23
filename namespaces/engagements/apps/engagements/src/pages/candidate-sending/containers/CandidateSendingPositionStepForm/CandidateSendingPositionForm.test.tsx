import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import CandidateSendingPositionStepForm from './CandidateSendingPositionStepForm'
import { useCandidateSendingContext } from '../../hooks'
import { CandidateSendingContextType } from '../CandidateSendingProvider/types'

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))
jest.mock('../../components', () => ({
  ClientAvailabilityRequestsSelectField: () => (
    <div data-testid='client-availability-requests-select-field' />
  ),
  LabelRequiredPrefix: () => <div />,
  CompanyAutocompleteField: () => (
    <div data-testid='company-autocomplete-field' />
  ),
  JobTalentsAutocompleteField: () => (
    <div data-testid='job-talents-autocomplete-field' />
  ),
  TalentAutocompleteField: () => <div data-testid='talent-autocomplete-field' />
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const arrangeTest = (
  props?: Partial<ComponentProps<typeof CandidateSendingPositionStepForm>>,
  contextProps?: Pick<
    CandidateSendingContextType,
    'clientId' | 'queryParametersJobId' | 'queryParametersTalentId'
  >
) => {
  useCandidateSendingContextMock.mockImplementation(() => contextProps)

  return render(
    <TestWrapper>
      <CandidateSendingPositionStepForm {...props} />
    </TestWrapper>
  )
}

describe('CandidateSendingPositionStepForm', () => {
  it('renders default', () => {
    arrangeTest(undefined, {
      queryParametersJobId: null,
      queryParametersTalentId: null,
      clientId: null
    })

    expect(screen.getByTestId('company-autocomplete-field')).toBeInTheDocument()
    expect(screen.getByTestId('talent-autocomplete-field')).toBeInTheDocument()
  })

  describe('when `jobId` exists & there is no `talentId`', () => {
    it('renders JobTalentsAutocompleteField', () => {
      arrangeTest(undefined, {
        queryParametersJobId: 'job-id',
        queryParametersTalentId: null,
        clientId: null
      })

      expect(
        screen.getByTestId('job-talents-autocomplete-field')
      ).toBeInTheDocument()
    })
  })

  describe('when there is `jobId` & `talentId`', () => {
    it('does not render JobTalentsAutocompleteField', () => {
      arrangeTest(
        {
          talent: { id: 'talent-id', type: 'some-type' }
        },
        {
          queryParametersJobId: 'job-id',
          queryParametersTalentId: 'talent-id',
          clientId: null
        }
      )

      expect(
        screen.queryByTestId('job-talents-autocomplete-field')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is no `jobId` & there is `clientId`', () => {
    it('renders ClientAvailabilityRequestsSelectField', () => {
      arrangeTest(undefined, {
        queryParametersJobId: null,
        queryParametersTalentId: null,
        clientId: 'client-id'
      })

      expect(
        screen.getByTestId('client-availability-requests-select-field')
      ).toBeInTheDocument()
    })
  })

  describe('when there is no `jobId` and there is `talentId`', () => {
    it('does not render TalentAutocompleteField', () => {
      arrangeTest(
        { talent: { id: 'talent-id', type: 'some-type' } },
        {
          queryParametersJobId: null,
          queryParametersTalentId: 'talent-id',
          clientId: null
        }
      )

      expect(
        screen.queryByTestId('talent-autocomplete-field')
      ).not.toBeInTheDocument()
    })
  })
})
