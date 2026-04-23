import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import { createTalentAvailabilityFragmentMock } from '@staff-portal/talents/src/mocks'
import { WebResourceFragment } from '@staff-portal/facilities'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import ConfirmEngagementEndDatesQuestionItem, {
  Props
} from './ConfirmEngagementEndDatesQuestionItem'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../../../data/get-availability-step-talent-availability-data'

const renderComponent = ({
  jobExpectedWeeklyHoursWithDefault,
  talentAvailability
}: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <ConfirmEngagementEndDatesQuestionItem
          jobExpectedWeeklyHoursWithDefault={jobExpectedWeeklyHoursWithDefault}
          talentAvailability={talentAvailability}
        />
      </Form>
    </TestWrapper>
  )
}

describe('ConfirmEngagementEndDatesQuestionItem', () => {
  const checkboxText =
    'Did you confirm with Engagement 1 Claimer, Engagement 2 Claimer end date for engagements Engagement 1, Engagement 2?'
  const checkboxTextSingleClaimer =
    'Did you confirm with Engagement 1 Claimer end date for engagements Engagement 1?'

  const baseProps = {
    jobExpectedWeeklyHoursWithDefault: 15,
    talentAvailability: createTalentAvailabilityFragmentMock({
      type: 'Developer',
      availableHoursIncludingEndingEngagements: 10,
      endingEngagements: {
        nodes: [
          {
            id: '123',
            endDate: '2022-01-01',
            proposedEnd: {
              endDate: '2022-01-01'
            },
            commitment: EngagementCommitmentEnum.FULL_TIME,
            webResource: {
              text: 'Engagement 1'
            },
            job: {
              id: '123',
              claimer: {
                id: '123',
                fullName: 'Engagement 1 Claimer',
                webResource: {
                  text: 'Engagement 1 Claimer',
                  url: ''
                } as Pick<WebResourceFragment['webResource'], 'url'>
              }
            }
          },
          {
            id: '234',
            endDate: '2022-01-01',
            proposedEnd: {
              endDate: '2022-01-01'
            },
            commitment: EngagementCommitmentEnum.FULL_TIME,
            webResource: {
              text: 'Engagement 2'
            },
            job: {
              id: '234',
              claimer: {
                id: '234',
                fullName: 'Engagement 2 Claimer',
                webResource: {
                  text: 'Engagement 2 Claimer',
                  url: ''
                } as Pick<WebResourceFragment['webResource'], 'url'>
              }
            }
          }
        ]
      }
    }) as AvailabilityStepTalentAvailabilityDataFragment['talent']
  }

  describe('when engagement is unavailable', () => {
    it('renders the component', () => {
      renderComponent(baseProps)

      expect(
        screen.getAllByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when engagements have some jobs without claimers', () => {
    it('renders the component', () => {
      renderComponent({
        ...baseProps,
        talentAvailability: createTalentAvailabilityFragmentMock({
          ...baseProps.talentAvailability,
          endingEngagements: {
            nodes: [
              baseProps.talentAvailability?.endingEngagements?.nodes[0]!,
              {
                ...baseProps.talentAvailability?.endingEngagements?.nodes[1]!,
                job: {
                  id: '234'
                }
              }
            ]
          }
        }) as AvailabilityStepTalentAvailabilityDataFragment['talent']
      })

      expect(
        screen.getAllByText(
          (_, element) =>
            element?.textContent?.includes(checkboxTextSingleClaimer) ?? false
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when engagements have some jobs without claimer web resource', () => {
    it('renders the component', () => {
      renderComponent({
        ...baseProps,
        talentAvailability: createTalentAvailabilityFragmentMock({
          ...baseProps.talentAvailability,
          endingEngagements: {
            nodes: [
              baseProps.talentAvailability?.endingEngagements?.nodes[0]!,
              {
                ...baseProps.talentAvailability?.endingEngagements?.nodes[1]!,
                job: {
                  id: '234',
                  claimer: {
                    id: '234',
                    fullName: 'Engagement 2 Claimer',
                    webResource: {}
                  }
                }
              }
            ]
          }
        }) as AvailabilityStepTalentAvailabilityDataFragment['talent']
      })

      expect(
        screen.getAllByText(
          (_, element) =>
            element?.textContent?.includes(checkboxTextSingleClaimer) ?? false
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when engagements do not have jobs with claimers', () => {
    it('does not render the component', () => {
      renderComponent({
        ...baseProps,
        talentAvailability: createTalentAvailabilityFragmentMock({
          ...baseProps.talentAvailability,
          endingEngagements: {
            nodes: [
              {
                ...baseProps.talentAvailability?.endingEngagements?.nodes[0]!,
                job: {
                  id: '123'
                }
              },
              {
                ...baseProps.talentAvailability?.endingEngagements?.nodes[1]!,
                job: {
                  id: '234'
                }
              }
            ]
          }
        }) as AvailabilityStepTalentAvailabilityDataFragment['talent']
      })

      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when engagements do not have jobs with claimer web resources', () => {
    it('does not render the component', () => {
      renderComponent({
        ...baseProps,
        talentAvailability: createTalentAvailabilityFragmentMock({
          ...baseProps.talentAvailability,
          endingEngagements: {
            nodes: [
              {
                ...baseProps.talentAvailability?.endingEngagements?.nodes[0]!,
                job: {
                  id: '123',
                  claimer: {
                    id: '123',
                    fullName: 'Engagement 1 Claimer',
                    webResource: undefined as unknown as Pick<
                      WebResourceFragment['webResource'],
                      'url'
                    >
                  }
                }
              },
              {
                ...baseProps.talentAvailability?.endingEngagements?.nodes[1]!,
                job: {
                  id: '234',
                  claimer: {
                    id: '234',
                    fullName: 'Engagement 2 Claimer',
                    webResource: undefined as unknown as Pick<
                      WebResourceFragment['webResource'],
                      'url'
                    >
                  }
                }
              }
            ]
          }
        }) as AvailabilityStepTalentAvailabilityDataFragment['talent']
      })

      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when ending engagements list is empty', () => {
    it('does not render the component', () => {
      renderComponent({
        ...baseProps,
        talentAvailability: createTalentAvailabilityFragmentMock({
          ...baseProps.talentAvailability,
          endingEngagements: {
            nodes: []
          }
        }) as AvailabilityStepTalentAvailabilityDataFragment['talent']
      })

      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when engagement is available', () => {
    it('does not render the component', () => {
      renderComponent({
        ...baseProps,
        jobExpectedWeeklyHoursWithDefault: 5
      })

      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )
      ).not.toBeInTheDocument()
    })
  })

  describe('when talent availability is not set', () => {
    it('does not render the component', () => {
      renderComponent({
        ...baseProps,
        talentAvailability: null
      })

      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(checkboxText) ?? false
        )
      ).not.toBeInTheDocument()
    })
  })
})
