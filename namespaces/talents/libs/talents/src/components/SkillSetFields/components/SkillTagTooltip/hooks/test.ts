import { renderHook } from '@testing-library/react-hooks'
import { SkillRating } from '@staff-portal/graphql/staff'

import { TooltipPage, TooltipTitle } from '../config'
import useSkillTagTooltipPagesNavigation from './skill-tag-tooltip-pages-navigation'

const arrangeTest = (
  skillRating = SkillRating.EXPERT,
  skillConnections = 0,
  hideVettingInformation?: boolean
) => {
  const { result } = renderHook(() =>
    useSkillTagTooltipPagesNavigation(
      skillRating,
      skillConnections,
      hideVettingInformation
    )
  )

  return result.current
}

describe('useSkillTagTooltipPagesNavigation', () => {
  const skillConnectionsCount = 1
  const hideVettingInformation = true

  it('hides navigation buttons when there are no skill conections', () => {
    const { showNavigationButtons } = arrangeTest()

    expect(showNavigationButtons).toBe(false)
  })

  it('hides navigation buttons when we want to hide vetting information', () => {
    const { showNavigationButtons } = arrangeTest(
      SkillRating.EXPERT,
      skillConnectionsCount,
      hideVettingInformation
    )

    expect(showNavigationButtons).toBe(false)
  })

  it('hides navigation buttons when the skill is not rated as expert', () => {
    const { showNavigationButtons } = arrangeTest(
      SkillRating.COMPETENT,
      skillConnectionsCount,
      hideVettingInformation
    )

    expect(showNavigationButtons).toBe(false)
  })

  it('shows navigation buttons when there is at least one skill conection', () => {
    const { showNavigationButtons } = arrangeTest(
      SkillRating.EXPERT,
      skillConnectionsCount
    )

    expect(showNavigationButtons).toBe(true)
  })

  it('initially shows skill connections page when there is at least one skill connection', () => {
    const { title, isSkillConnectionsPageActive, isVettingPageActive } =
      arrangeTest(SkillRating.EXPERT, skillConnectionsCount)

    expect(title).toBe(TooltipTitle[TooltipPage.SkillConnections])
    expect(isSkillConnectionsPageActive).toBe(true)
    expect(isVettingPageActive).toBe(false)
  })

  it('initially shows vetting page when there are no skill connection', () => {
    const { title, isSkillConnectionsPageActive, isVettingPageActive } =
      arrangeTest()

    expect(title).toBe(TooltipTitle[TooltipPage.Vetting])
    expect(isSkillConnectionsPageActive).toBe(false)
    expect(isVettingPageActive).toBe(true)
  })
})
