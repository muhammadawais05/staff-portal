import { Client } from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import {
  getCompanyApplicantsListResponse,
  getPendoVisitorResponse
} from '../responses'

export const companyApplicantsPageStubs = (
  client?: Partial<Client>
): { [key: string]: OperationValue } => ({
  GetCompanyApplicantsList: getCompanyApplicantsListResponse(client),
  GetKipperToken: {
    data: {
      viewer: {
        tokens: {
          charts:
            'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDE4MTA3NDksInJvbGVfdG9rZW4iOiIxX1MxWTMzWDJSZV9oYVV3ODVVdCIsImlzcyI6InRvcHRhbC1wbGF0Zm9ybSJ9.7x0EcaUYxW7Q9sBWfOOdjvJgNN37RuVa3w6Hic74of4'
        }
      }
    }
  },
  TouchCounter: {
    data: {
      touchCounter: {
        success: true,
        errors: [],
        __typename: 'TouchCounterPayload',
        counter: {
          name: 'company_applicants',
          total: 1,
          unread: 0,
          __typename: 'Counter'
        }
      }
    }
  },
  GetPendoVisitor: getPendoVisitorResponse()
})
