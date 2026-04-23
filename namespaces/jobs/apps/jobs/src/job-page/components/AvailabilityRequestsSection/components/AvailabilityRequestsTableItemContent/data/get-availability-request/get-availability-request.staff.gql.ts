import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { JOB_POSITION_ANSWER_FRAGMENT } from '@staff-portal/jobs'

import { GetAvailabilityRequestDocument } from './get-availability-request.staff.gql.types'

export const GET_AVAILABILITY_REQUEST = gql`
  query GetAvailabilityRequest($requestId: ID!, $jobId: ID!) {
    node(id: $requestId) {
      ... on AvailabilityRequest {
        job {
          id
          skillSets {
            nodes {
              id
              skill {
                id
              }
            }
          }
          applicantsEmailMessaging {
            id
            operations {
              sendEmailTo {
                ...OperationFragment
              }
            }
          }
        }
        talent {
          id
          fullName
          type
          slackContacts: contacts(filter: { type: COMMUNITY_SLACK }) {
            nodes {
              id
              webResource {
                url
              }
            }
          }
          locationV2 {
            country {
              id
              name
            }
          }
          timeZone {
            name
          }
          webResource {
            url
          }
          hourlyRate
          photo {
            small
          }
          talentPartner {
            id
            webResource {
              text
              url
            }
          }
          resumeUrl
          skillSets {
            nodes {
              id
              rating
              connections {
                totalCount
              }
              skill {
                id
                name
              }
              vettedResult {
                result
              }
            }
          }
          matchQualityMetrics(jobId: $jobId) {
            nodes {
              label
              labelLink
              labelTooltip
              name
              value
              valueTooltip
            }
          }
          engagements {
            counters {
              workingNumber
              clientsNumber
              repeatedClientsNumber
              acceptedInterviewsNumber
              approvedTrialsNumber
              interviewsNumber
              successRate
              trialsNumber
            }
          }
        }
        resumeUrl
        jobPositionAnswers {
          nodes {
            ...JobPositionAnswerFragment
          }
        }
        operations {
          withdrawAvailabilityRequest {
            callable
            messages
          }
        }
        expirationReason
        talentComment
        rejectReason
        emailMessaging {
          id
          operations {
            sendEmailTo {
              ...OperationFragment
            }
          }
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${JOB_POSITION_ANSWER_FRAGMENT}
`

export const useGetAvailabilityRequest = (requestId: string, jobId: string) =>
  useGetNode(GetAvailabilityRequestDocument)(
    { requestId, jobId },
    { throwOnError: true }
  )
