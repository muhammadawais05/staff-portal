import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getSubmitNewEngagementWizardResponse = ({
  availabilityRequestId,
  jobApplicationId
}: {
  availabilityRequestId: string
  jobApplicationId: string
}) => ({
  data: {
    submitNewEngagementWizard: {
      engagement: {
        id: encodeEntityId('123', 'Engagement'),
        status: 'PENDING',
        job: {
          id: encodeEntityId('123', 'Job'),
          webResource: {
            text: 'Supreme Chief Security Developer (232893)',
            url: 'https://some.url',
            __typename: 'Link'
          },
          __typename: 'Job'
        },
        talent: {
          id: encodeEntityId('123', 'Talent'),
          fullName: 'Shera Herman',
          __typename: 'Talent'
        },
        __typename: 'Engagement'
      },
      rejectionFeedback: {
        internalFeedbackTitleAndSlugs: [
          {
            key: 'missing_valuable_skills',
            value: 'Missing valuable skills',
            __typename: 'KeyValueStrings'
          },
          {
            key: 'previous_jobs_not_convincing',
            value: 'Previous jobs not convincing',
            __typename: 'KeyValueStrings'
          }
        ],
        internalFeedbackTooltips: [
          {
            key: 'missing_valuable_skills',
            value:
              'Talent is missing the critical mass of skills needed to make their profile valuable',
            __typename: 'KeyValueStrings'
          },
          {
            key: 'previous_jobs_not_convincing',
            value:
              "Talent's previous jobs don't suggest value our clients expect",
            __typename: 'KeyValueStrings'
          }
        ],
        rejectedApplications: {
          nodes: [
            {
              id: availabilityRequestId,
              availabilityRequestTalent: {
                id: encodeEntityId('124', 'Talent'),
                profileLink: {
                  text: 'Alissa Spinka',
                  url: 'https://some.url',
                  __typename: 'TalentProfileLink'
                },
                __typename: 'Talent'
              },
              __typename: 'AvailabilityRequest'
            },
            {
              id: jobApplicationId,
              jobApplicationTalent: {
                id: encodeEntityId('125', 'Talent'),
                profileLink: {
                  text: 'Man Hudson',
                  url: 'https://some.url',
                  __typename: 'TalentProfileLink'
                },
                __typename: 'Talent'
              },
              __typename: 'JobApplication'
            }
          ],
          __typename: 'RejectedApplicationConnection'
        },
        __typename: 'RejectionFeedback'
      },
      __typename: 'SubmitNewEngagementWizardPayload',
      success: true,
      errors: []
    }
  }
})
