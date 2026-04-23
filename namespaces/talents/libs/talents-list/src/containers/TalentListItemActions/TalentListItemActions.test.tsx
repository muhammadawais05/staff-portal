import React, { ComponentPropsWithoutRef } from 'react'
import { render, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentListItemActions from './TalentListItemActions'

const arrangeTest = ({
  jobId,
  addTalentToJobFavoritesOperation
}: Partial<ComponentPropsWithoutRef<typeof TalentListItemActions>> = {}) =>
  render(
    <TestWrapperWithMocks>
      <TalentListItemActions
        jobId={jobId}
        talentId={encodeEntityId('123', 'Talent')}
        talentName='Test Talent Name'
        talentResumeUrl='http://test.talent.net'
        createTalentAvailabilityRequestOperation={{
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }}
        addTalentToJobFavoritesOperation={addTalentToJobFavoritesOperation}
      />
    </TestWrapperWithMocks>
  )

describe('TalentListItemActions', () => {
  describe('when jobId is provided', () => {
    const jobId = encodeEntityId('123', 'Job')

    describe('when addTalentToJobFavoritesOperation is enabled', () => {
      it('renders Add To Favorites button', () => {
        arrangeTest({
          jobId,
          addTalentToJobFavoritesOperation: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        })

        expect(
          screen.queryByTestId('add-to-favorites-button')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('add-to-favorites-button')
        ).not.toHaveAttribute('disabled')
      })
    })

    describe('when addTalentToJobFavoritesOperation is disabled', () => {
      it('renders Add To Favorites button', () => {
        arrangeTest({
          jobId,
          addTalentToJobFavoritesOperation: {
            callable: OperationCallableTypes.DISABLED,
            messages: []
          }
        })

        expect(
          screen.queryByTestId('add-to-favorites-button')
        ).toBeInTheDocument()
        expect(screen.getByTestId('add-to-favorites-button')).toHaveAttribute(
          'disabled'
        )
      })
    })

    it('renders the "View Resume" button', () => {
      arrangeTest({ jobId })

      expect(screen.getByText('View Resume')).toBeInTheDocument()
    })
  })

  describe('when jobId is not provided', () => {
    it('renders the "Public Profile" button', () => {
      arrangeTest()

      expect(screen.getByText('Public Profile')).toBeInTheDocument()
    })
  })
})
