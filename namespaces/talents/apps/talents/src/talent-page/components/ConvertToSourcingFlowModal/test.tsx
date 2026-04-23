import { render, screen, waitFor } from '@testing-library/react'
import { fireEvent } from '@toptal/picasso/test-utils'
import React from 'react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createCountryFragment } from '@staff-portal/facilities/src/mocks'
import { TalentApplicantSkillFragment } from '@staff-portal/talents'

import { DefaultApplicationAnswersFragment } from './data/get-convert-to-sourcing-flow'
import {
  ConvertToSourcingFlowModal,
  Props
} from './components/ConvertToSourcingFlowModal'
import {
  createConvertToSourcingFlowFailedMock,
  createConvertToSourcingFlowMock
} from './data/use-convert-to-sourcing-flow/mocks'
import { createGetConvertToSourcingFlowMock } from './data/get-convert-to-sourcing-flow/mocks'

jest.mock(
  '@staff-portal/google-maps/src/services/load-gmaps-options/load-gmaps-options',
  () => ({
    getCityOptionsFromGoogleMaps: () =>
      Promise.resolve([
        {
          value: '12345',
          text: 'Milano, District 2, Sub District 2'
        }
      ])
  })
)

jest.setTimeout(10000)

const TALENT_ID = 'abc123'
const ADDRESS = 'Milano, District 2, Sub District 2'
const PLACE_ID = '12345'

const defaultTalentData = {
  talentId: TALENT_ID,
  fullName: 'Full Name',
  email: 'test@gmail.com',
  applicantSkills: [
    {
      id: 'applicant-id',
      name: 'Web'
    }
  ],
  countries: [
    createCountryFragment({
      code: 'GL',
      id: '123',
      name: 'Greenland'
    }),
    createCountryFragment({
      code: 'PL',
      id: '456',
      name: 'Poland'
    })
  ],
  locationV2: {
    cityName: 'Sri Jayawardenepura Kotte',
    countryName: 'Sri Lanka'
  },
  citizenship: createCountryFragment(),
  defaultApplicationAnswers: [
    {
      id: 'VjEtQXBwbGljYXRpb25BbnN3ZXIt',
      answers: [],
      question: {
        id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbi0yOA',
        label: 'How many hours per week do you plan to work for Toptal?',
        kind: 'SELECT',
        options: {
          nodes: [
            {
              id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzI4MQ',
              content: '< 20 hours'
            },
            {
              id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzI4Mg',
              content: '20-30 hours'
            },
            {
              id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzI4Mw',
              content: '30-40 hours'
            },
            {
              id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzI4NA',
              content: '> 40 hours'
            }
          ],
          totalCount: 4
        }
      }
    }
  ]
}

const defaultProps: Props = {
  talentId: TALENT_ID,
  hideModal: () => {}
}

const answers =
  defaultTalentData?.defaultApplicationAnswers as DefaultApplicationAnswersFragment[]
const questionId = answers[0].question.id
const option = answers[0].question.options.nodes[0]

const arrangeTest = ({
  props,
  mocks = []
}: {
  props?: Partial<Props>
  mocks?: MockedResponse[]
} = {}) => {
  const fullProps = {
    ...defaultProps,
    ...props
  } as Props

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ConvertToSourcingFlowModal
        talentId={fullProps.talentId}
        hideModal={fullProps.hideModal}
      />
    </TestWrapperWithMocks>
  )
}

const getControls = () => {
  const fullNameEl = screen.getByLabelText(/Full name/i)
  const emailEl = screen.getByLabelText(/Email/i)
  const countryEl = screen.getByLabelText(/Country/i)
  const cityEl = screen.getByTestId('convert-to-sourcing-flow-city')
  const citizenshipEl = screen.getByLabelText(/Citizenship/i)
  const skillsEl = screen.getByTestId('talent-applicant-skills-selector-input')

  const submitButtonEl = screen.getByTestId('convert-to-sourcing-flow-submit')
  const answersContainerEl = screen.getByTestId(
    'convert-to-sourcing-flow-answer-container'
  )

  return {
    fullNameEl,
    emailEl,
    countryEl,
    cityEl,
    citizenshipEl,
    skillsEl,
    answersContainerEl,
    submitButtonEl
  }
}

const fillAndSubmitForm = ({
  fullName,
  email,
  country,
  city,
  questionID,
  questionText,
  citizenship
}: {
  fullName: string
  email: string
  country: string
  city: string
  questionID: string
  questionText: string
  citizenship: string
}) => {
  const {
    fullNameEl,
    emailEl,
    cityEl,
    countryEl,
    citizenshipEl,
    submitButtonEl
  } = getControls()

  fireEvent.change(fullNameEl, {
    target: { value: fullName }
  })
  fireEvent.change(emailEl, {
    target: { value: email }
  })

  fireEvent.click(countryEl)
  fireEvent.click(screen.getByText(country))

  fireEvent.change(cityEl, {
    target: { value: city }
  })

  const cityOption = screen.getByText(city)

  fireEvent.click(cityOption)

  fireEvent.click(citizenshipEl)
  fireEvent.click(screen.getByText(citizenship))

  const answerEl = document.getElementById(
    `answers.${questionID}`
  ) as HTMLElement

  fireEvent.click(answerEl)
  fireEvent.click(screen.getByText(questionText))

  fireEvent.click(submitButtonEl)
}

const getMutationInput = () => {
  return {
    fullName: 'Some new name',
    email: 'new-email@gmail.com',
    talentId: defaultProps.talentId as string,
    applicantSkillIds: [
      (defaultTalentData.applicantSkills as TalentApplicantSkillFragment[])[0]
        .id
    ],
    applicationAnswers: [
      {
        questionId,
        answers: [option.content]
      }
    ],
    citizenshipId: defaultTalentData.countries[1].id,
    countryId: defaultTalentData.countries[0].id,
    city: ADDRESS,
    placeId: PLACE_ID
  }
}

describe('ConvertToSourcingFlowModal', () => {
  it('displays all fields', async () => {
    arrangeTest({
      mocks: [createGetConvertToSourcingFlowMock({ talentId: TALENT_ID })]
    })

    await waitFor(() => {
      const {
        fullNameEl,
        emailEl,
        countryEl,
        cityEl,
        citizenshipEl,
        skillsEl,
        answersContainerEl
      } = getControls()

      expect(fullNameEl).toBeInTheDocument()
      expect(emailEl).toBeInTheDocument()
      expect(countryEl).toBeInTheDocument()
      expect(cityEl).toBeInTheDocument()
      expect(citizenshipEl).toBeInTheDocument()
      expect(skillsEl).toBeInTheDocument()
      expect(answersContainerEl).toBeInTheDocument()
    })
  })

  it('does not display answers field', async () => {
    arrangeTest({
      mocks: [
        createGetConvertToSourcingFlowMock({
          talentId: TALENT_ID,
          defaultApplicationAnswers: []
        })
      ]
    })

    await waitFor(() => {
      expect(
        screen.queryByTestId('convert-to-sourcing-flow-answer-container')
      ).not.toBeInTheDocument()
    })
  })

  it('shows successful notification', async () => {
    const hideModal = jest.fn()
    const skill = (
      defaultTalentData.applicantSkills as TalentApplicantSkillFragment[]
    )[0]
    const mutationInput = getMutationInput()

    arrangeTest({
      props: {
        talentId: TALENT_ID,
        hideModal
      },
      mocks: [
        createConvertToSourcingFlowMock(mutationInput),
        createGetConvertToSourcingFlowMock({
          talentId: TALENT_ID,
          applicantSkills: [skill],
          citizenship: defaultTalentData.countries[0],
          locationV2: null
        })
      ]
    })

    await waitFor(() => {
      fillAndSubmitForm({
        city: ADDRESS,
        fullName: mutationInput.fullName,
        email: mutationInput.email,
        questionID: questionId,
        questionText: option.content,
        country: defaultTalentData.countries[0].name,
        citizenship: defaultTalentData.countries[1].name
      })
    })

    await (() => {
      expect(
        screen.getByText(
          'The talent profile was successfully converted to the sourcing flow.'
        )
      ).toBeInTheDocument()

      expect(hideModal).toHaveBeenCalled()
    })
  })

  it('shows error notification', async () => {
    const hideModal = jest.fn()
    const skill = (
      defaultTalentData.applicantSkills as TalentApplicantSkillFragment[]
    )[0]
    const mutationInput = getMutationInput()

    arrangeTest({
      props: {
        talentId: TALENT_ID,
        hideModal
      },
      mocks: [
        createConvertToSourcingFlowFailedMock(mutationInput),
        createGetConvertToSourcingFlowMock({
          talentId: TALENT_ID,
          applicantSkills: [skill],
          citizenship: defaultTalentData.countries[0],
          locationV2: null
        })
      ]
    })

    await waitFor(() => {
      fillAndSubmitForm({
        city: ADDRESS,
        fullName: mutationInput.fullName,
        email: mutationInput.email,
        questionID: questionId,
        questionText: option.content,
        country: defaultTalentData.countries[0].name,
        citizenship: defaultTalentData.countries[1].name
      })
    })

    await waitFor(async () => {
      expect(
        await screen.findByText(
          `An error occurred, can't convert Full Name to sourcing flow.`
        )
      ).toBeInTheDocument()

      expect(hideModal).not.toHaveBeenCalled()
    })
  })

  it('toggles disable state for the city field depends on country field value', async () => {
    const hideModal = jest.fn()
    const skill = (
      defaultTalentData.applicantSkills as TalentApplicantSkillFragment[]
    )[0]
    const mutationInput = getMutationInput()

    arrangeTest({
      props: {
        talentId: TALENT_ID,
        hideModal
      },
      mocks: [
        createConvertToSourcingFlowMock(mutationInput),
        createGetConvertToSourcingFlowMock({
          talentId: TALENT_ID,
          applicantSkills: [skill],
          citizenship: defaultTalentData.countries[0],
          locationV2: null
        })
      ]
    })

    await waitFor(async () => {
      const { cityEl, countryEl } = getControls()

      expect(cityEl).toBeDisabled()

      fireEvent.click(countryEl)
      fireEvent.click(screen.getByText(defaultTalentData.countries[0].name))

      expect(cityEl).toBeEnabled()
    })
  })

  it('renders the initial value for city field', async () => {
    const CITY_NAME = 'New York'
    const hideModal = jest.fn()

    arrangeTest({
      props: {
        talentId: TALENT_ID,
        hideModal
      },
      mocks: [
        createGetConvertToSourcingFlowMock({
          talentId: TALENT_ID,
          locationV2: {
            cityName: CITY_NAME,
            placeId: 'some-other-placeid',
            stateName: 'some-other-sate',
            countryName: 'OtherCountry'
          }
        })
      ]
    })

    await waitFor(() => {
      const { cityEl } = getControls()

      expect(cityEl).toHaveValue(CITY_NAME)
    })
  })

  it('clears city field if country is changed', async () => {
    const hideModal = jest.fn()
    const skill = (
      defaultTalentData.applicantSkills as TalentApplicantSkillFragment[]
    )[0]
    const mutationInput = getMutationInput()

    arrangeTest({
      props: {
        talentId: TALENT_ID,
        hideModal
      },
      mocks: [
        createConvertToSourcingFlowMock(mutationInput),
        createGetConvertToSourcingFlowMock({
          talentId: TALENT_ID,
          applicantSkills: [skill],
          citizenship: defaultTalentData.countries[0],
          locationV2: null
        })
      ]
    })

    await waitFor(async () => {
      const { cityEl, countryEl } = getControls()

      fireEvent.click(countryEl)
      fireEvent.click(screen.getByText(defaultTalentData.countries[0].name))

      fireEvent.change(cityEl, {
        target: { value: ADDRESS }
      })

      const cityOption = await screen.findByText(ADDRESS)

      fireEvent.click(cityOption)

      fireEvent.click(countryEl)
      fireEvent.click(screen.getByText(defaultTalentData.countries[1].name))
    })

    await waitFor(() => {
      const { cityEl } = getControls()

      expect(cityEl).toHaveValue('')
    })
  })
})
