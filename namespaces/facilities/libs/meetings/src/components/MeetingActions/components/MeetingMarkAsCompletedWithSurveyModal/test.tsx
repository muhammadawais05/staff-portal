import React from 'react'
import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { TalentObjectionSurveyReason } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  createFailedGetCountriesMock,
  createSuccessfulGetCountriesMock
} from '@staff-portal/facilities/src/mocks'

import { createSuccessfulCompleteMeetingWithSurveyMock } from './data/complete-meeting-with-survey/mocks'
import MeetingMarkAsCompletedWithSurveyModal from './MeetingMarkAsCompletedWithSurveyModal'

const hideModal = jest.fn()
const MEETING_ID = '123'
const CITY = 'Kiev'
const PLACE_ID = 'ua-kiev-1'
const REASONS_REQUIRE_COMMENT = [TalentObjectionSurveyReason.OTHER]
const COUNTRIES = [
  {
    id: '1',
    name: 'Ukraine',
    code: 'UA'
  }
]

jest.mock(
  '@staff-portal/google-maps/src/services/load-gmaps-options/load-gmaps-options',
  () => ({
    getCityOptionsFromGoogleMaps: () =>
      Promise.resolve([
        {
          value: PLACE_ID,
          text: CITY
        }
      ])
  })
)

const arrangeTest = (mocks?: MockedResponse[]) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <MeetingMarkAsCompletedWithSurveyModal
        meetingId={MEETING_ID}
        hideModal={hideModal}
      />
    </TestWrapperWithMocks>
  )
}

const getElements = () => {
  return {
    countryEl: screen.getByPlaceholderText('Country'),
    cityEl: screen.getByTestId('CountryCityFields-input-city-input'),
    reasonEl: screen.getByLabelText(
      /What talent objections have you encountered during your sourcing call\?/
    ),
    commentEl: screen.getByLabelText('Comment'),
    doneButton: screen.getByRole('button', { name: 'Done' })
  }
}

const fillAndSubmitForm = ({
  countryId,
  city,
  reason,
  comment
}: {
  countryId: string
  city: string
  reason: TalentObjectionSurveyReason
  comment: string
}) => {
  const { countryEl, cityEl, reasonEl, commentEl, doneButton } = getElements()

  fireEvent.change(countryEl, {
    target: { value: countryId }
  })

  fireEvent.change(cityEl, {
    target: { value: city }
  })

  fireEvent.click(screen.getByText(city))

  fireEvent.change(reasonEl, {
    target: { value: reason }
  })

  fireEvent.change(commentEl, {
    target: { value: comment }
  })

  fireEvent.click(doneButton)
}

describe('MeetingMarkAsCompletedWithSurveyModal', () => {
  it('renders the validation errors', async () => {
    arrangeTest([createSuccessfulGetCountriesMock()])

    const { countryEl, cityEl, reasonEl, commentEl, doneButton } = getElements()

    // Wait for loading countries.
    await waitFor(() => {
      expect(countryEl).not.toBeDisabled()
    })

    fireEvent.click(doneButton)

    expect(
      countryEl.closest('[data-field-has-error="true"]')
    ).toBeInTheDocument()

    expect(cityEl.closest('[data-field-has-error="true"]')).toBeInTheDocument()

    expect(
      reasonEl.closest('[data-field-has-error="true"]')
    ).toBeInTheDocument()

    expect(
      commentEl.closest('[data-field-has-error="true"]')
    ).not.toBeInTheDocument()
  })

  it('makes comment field required depending on the selected reason', () => {
    arrangeTest()

    const { reasonEl, commentEl } = getElements()

    // Check reasons that require comment.
    REASONS_REQUIRE_COMMENT.forEach(reason => {
      fireEvent.change(reasonEl, {
        target: { value: reason }
      })

      expect(
        commentEl
          .closest('[class*="PicassoFormField-root"]')
          ?.querySelectorAll('[class*="PicassoFormLabel-asterisk"]')
      ).toHaveLength(1)
    })

    // Check reasons that do not require comment.
    Object.values(TalentObjectionSurveyReason)
      .filter(reason => !REASONS_REQUIRE_COMMENT.includes(reason))
      .forEach(reason => {
        fireEvent.change(reasonEl, {
          target: { value: reason }
        })

        expect(
          commentEl
            .closest('[class*="PicassoFormField-root"]')
            ?.querySelectorAll('[class*="PicassoFormLabel-asterisk"]')
        ).toHaveLength(0)
      })
  })

  it('renders error message when loading countries failed', async () => {
    arrangeTest([createFailedGetCountriesMock()])

    expect(
      await screen.findByText('Unable to load countries.')
    ).toBeInTheDocument()
  })

  it('renders success message when the survey is submitted successfully', async () => {
    const formValues = {
      countryId: '1',
      city: CITY,
      reason: TalentObjectionSurveyReason.BENEFITS,
      comment: 'Some notes'
    }

    arrangeTest([
      createSuccessfulGetCountriesMock(COUNTRIES),
      createSuccessfulCompleteMeetingWithSurveyMock({
        meetingId: MEETING_ID,
        placeId: PLACE_ID,
        ...formValues
      })
    ])

    const { countryEl } = getElements()

    // Wait for loading countries.
    await waitFor(() => {
      expect(countryEl).not.toBeDisabled()
    })

    await waitFor(() => {
      fillAndSubmitForm(formValues)
    })

    expect(
      await screen.findByText('Meeting was marked as "Completed"')
    ).toBeInTheDocument()
  })
})
