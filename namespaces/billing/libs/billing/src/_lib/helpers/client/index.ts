import { Maybe } from '@staff-portal/graphql/staff'

// `talentType` should be an enum but sadly not
// To get the values
// query verticals {
//   verticals {
//     nodes {
//       talentType
//     }
//   }
// }

interface GetMatcherType {
  matchers?: {
    id: string
    role: {
      id: string
      fullName: string
      webResource: { text: string; url?: Maybe<string> }
    }
    vertical: { id: string; talentType: string }
  }[]
  talentType:
    | 'finance_expert'
    | 'developer'
    | 'product_manager'
    | 'designer'
    | 'project_manager'
}

export const getMatcherRoleByType = ({
  matchers,
  talentType
}: GetMatcherType) => {
  if (!matchers?.length) {
    return undefined
  }

  // Currently it seems, only a single Matcher type one can be returned
  const resultMatchers = matchers.filter(
    matcher => matcher.vertical.talentType === talentType
  )

  return resultMatchers.length && resultMatchers[0]?.role
    ? resultMatchers[0].role
    : undefined
}
