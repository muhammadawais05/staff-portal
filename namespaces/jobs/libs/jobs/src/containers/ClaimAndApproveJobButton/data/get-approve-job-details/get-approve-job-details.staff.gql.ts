import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetApproveJobDetailsDocument } from './get-approve-job-details.staff.gql.types'

export const GET_APPROVE_JOB_DETAILS: typeof GetApproveJobDetailsDocument = gql`
  query GetApproveJobDetails($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        title
        limitedAvailabilityRequestsExperiment {
          numberLimit
          hoursLimit
        }

        # Step 1 data
        maxHourlyRate
        noRateLimit
        uncertainOfBudgetReason
        uncertainOfBudgetReasonComment
        budgetDetails

        longshotReasons

        requiresMatchingCallInfo

        commitment
        expectedWeeklyHours

        availableSpecializations {
          nodes {
            id
            title
          }
        }

        claimer {
          id
        }

        client {
          id
          jobDepositCanBeIssued
          depositInvoices {
            nodes {
              id
              webResource {
                url
              }
            }
          }
        }
        categories {
          nodes {
            id
          }
        }
        vertical {
          id
          jobCategories(order: { field: ID, direction: ASC }) {
            nodes {
              id
              name
            }
          }
        }
        possiblyRelatedMeetings {
          nodes {
            id
            scheduledAt
            organizer {
              ... on Role {
                id
                fullName
              }
              ... on Client {
                id
                fullName
              }
            }
          }
        }
        hiddenForTalents

        # Step 2 data
        skillSets {
          nodes {
            id
            main
            rating
            niceToHave
            skill {
              id
              name
              competentProfilesCount
              expertProfilesCount
              strongProfilesCount
              totalProfilesCount
              category {
                id
                title
              }
            }
          }
        }
        defaultSkillCategory {
          id
        }

        # Step 3 data
        description
        positionQuestions {
          nodes {
            id
            comment
            label
            required
            template {
              id
              sticky
              question
            }
          }
        }
        requiredApplicationPitch
      }
    }

    jobLongshotReasons
    jobUncertainOfBudgetReasons
    activeJobPositionQuestionTemplates {
      nodes {
        id
        question
        sticky
      }
    }

    viewer {
      me {
        id
        inTalentMatchers
      }
      permits {
        canManageJobMaxHourlyRate
      }
    }
  }
`

export const useGetApproveJobDetails = (jobId: string) => {
  const { data, ...restOptions } = useQuery(GET_APPROVE_JOB_DETAILS, {
    throwOnError: true,
    variables: { jobId }
  })

  return {
    data,
    ...restOptions
  }
}
