import { useQuery } from '@staff-portal/data-layer-service'

import { DEFAULT_ROLE_NAME } from '../../config'
import { getFormattedRoleTitle } from '../../utils'
import { GetRoleTitleDataDocument } from '../../data/get-role-title-data'

const useGetRoleTitle = ({
  jobId,
  talentId,
  withSpecializationTitle,
  roleTitleLowerCased
}: {
  jobId?: string | null
  talentId?: string | null
  withSpecializationTitle?: boolean
  roleTitleLowerCased?: boolean
}) => {
  const { data, loading } = useQuery(GetRoleTitleDataDocument, {
    variables: {
      jobId: jobId ?? '',
      talentId: talentId ?? '',
      includeJobId: !!jobId,
      includeTalentId: !!talentId
    },
    fetchPolicy: 'cache-first'
  })

  const formattedRoleTitle = getFormattedRoleTitle({
    withSpecializationTitle,
    roleTitleLowerCased,
    jobType: data?.job?.jobType ?? data?.talent?.type ?? DEFAULT_ROLE_NAME,
    verticalNodes: data?.verticals.nodes,
    specializationTitle: data?.job?.specialization?.title
  })

  return {
    roleTitle: !loading ? formattedRoleTitle : null,
    loading
  }
}

export default useGetRoleTitle
