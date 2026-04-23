import { useState } from 'react'
import { SkillRating } from '@staff-portal/graphql/staff'

import { TooltipPage, TooltipTitle } from '../config'

const useSkillTagTooltipPagesNavigation = (
  skillRating: SkillRating,
  skillConnectionsCount: number,
  hideVettingInformation?: boolean
) => {
  const initialPage =
    skillConnectionsCount > 0 || hideVettingInformation
      ? TooltipPage.SkillConnections
      : TooltipPage.Vetting
  const [activePage, setActivePage] = useState<TooltipPage>(initialPage)

  return {
    title: TooltipTitle[activePage],
    isSkillConnectionsPageActive: activePage === TooltipPage.SkillConnections,
    isVettingPageActive: activePage === TooltipPage.Vetting,
    navigateToSkillConnectionPage: () =>
      setActivePage(TooltipPage.SkillConnections),
    navigateToVettingPage: () => setActivePage(TooltipPage.Vetting),
    showNavigationButtons:
      skillConnectionsCount > 0 &&
      !hideVettingInformation &&
      skillRating === SkillRating.EXPERT
  }
}

export default useSkillTagTooltipPagesNavigation
