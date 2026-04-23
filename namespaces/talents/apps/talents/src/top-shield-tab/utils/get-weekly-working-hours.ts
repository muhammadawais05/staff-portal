import {
  TalentTopShieldEngagementFragment,
  TalentTopShieldFragment
} from '@staff-portal/talents-top-shield'

export const getWeeklyWorkingHours = (
  talentTopShield: TalentTopShieldFragment,
  engagement: TalentTopShieldEngagementFragment
) => {
  const latestWorkingPeriods = talentTopShield?.workingPeriods?.nodes
    .slice()
    .sort(
      (nodeA, nodeB) =>
        Number(new Date(nodeB.start)) - Number(new Date(nodeA.start))
    )
    .flatMap(node => node.activeEngagements.edges)

  return (
    latestWorkingPeriods
      ?.find(e => e.node.id === engagement.id)
      ?.workingHours.toString() ?? '0'
  )
}
