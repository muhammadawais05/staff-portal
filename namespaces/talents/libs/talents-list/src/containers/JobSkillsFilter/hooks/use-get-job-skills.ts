import { useGetNode } from '@staff-portal/data-layer-service'

import { GetJobSkillsDataDocument } from '../data/get-job-skills-data'

const useGetJobSkills = (jobId: string) =>
  useGetNode(GetJobSkillsDataDocument)({ jobId }, { throwOnError: false })

export default useGetJobSkills
