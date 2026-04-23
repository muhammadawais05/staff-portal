import { useNotifications } from '@toptal/picasso/utils'

import { useGetTalentResumePublications } from '../get-talent-resume-publications/get-talent-resume-publications.staff.gql'
import { useGetTalentSkillsWithExperience } from '../get-talent-skills-with-experience/get-talent-skills-with-experience.staff.gql'
import { useGetTalentWorkExperiencePortfolioItems } from '../get-talent-work-experience-portfolio-items/get-talent-work-experience-portfolio-items.staff.gql'

const useGetTalentWorkExperienceData = (talentId: string) => {
  const { showError } = useNotifications()

  const {
    data: portfolioItems,
    talentType,
    loading: portfolioItemsLoading
  } = useGetTalentWorkExperiencePortfolioItems({
    talentId,
    onError: () => showError('Failed to load talent portfolio items.')
  })

  const { data: resumePublications, loading: resumePublicationsLoading } =
    useGetTalentResumePublications({
      talentId,
      onError: () => showError('Failed to load talent publications.')
    })

  const { data: skills, loading: skillsLoading } =
    useGetTalentSkillsWithExperience({
      talentId,
      onError: () => showError('Failed to load talent skills.')
    })

  const isLoadingItems =
    portfolioItemsLoading || resumePublicationsLoading || skillsLoading
  const hasItems =
    portfolioItems?.length || resumePublications?.length || skills?.length

  return {
    isLoadingItems,
    hasItems: Boolean(hasItems),
    talentType,
    portfolioItems,
    resumePublications,
    skills
  }
}

export default useGetTalentWorkExperienceData
