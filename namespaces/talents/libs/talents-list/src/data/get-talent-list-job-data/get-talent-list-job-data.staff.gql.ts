import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetTalentListJobDataDocument } from './get-talent-list-job-data.staff.gql.types'

export default gql`
  query GetTalentListJobData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        ...TalentListJobDataFragment
      }
    }
  }

  fragment TalentListJobDataFragment on Job {
    id
    webResource {
      text
      url
    }
    skillSets {
      nodes {
        ...TalentsListJobSkill
      }
    }
    client {
      id
      fullName
    }
    vertical {
      id
    }
    commitment
  }

  fragment TalentsListJobSkill on SkillSet {
    id
    main
    rating
    skill {
      id
      name
    }
  }
`

export const useGetTalentListJobData = (jobId?: string) =>
  useGetNode(GetTalentListJobDataDocument)(
    { jobId: jobId as string },
    { skip: !jobId }
  )
