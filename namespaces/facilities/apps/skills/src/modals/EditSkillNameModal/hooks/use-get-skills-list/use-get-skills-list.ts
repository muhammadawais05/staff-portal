import { useGetData } from '@staff-portal/data-layer-service'

import { GetSkillsListDocument } from '../../data'

const useGetSkillsList = (skillIds: string[]) => {
  const getSkillsList = useGetData(GetSkillsListDocument, 'staffNodes')

  return getSkillsList({ skillIds }, { fetchPolicy: 'cache-and-network' })
}

export default useGetSkillsList
