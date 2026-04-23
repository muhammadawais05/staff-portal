import { useState } from 'react'

export const useExpandableSkillName = () => {
  const [expandedSkillNameIds, setExpandedSkillNameIds] = useState<{
    [id: string]: boolean
  }>({})

  const expandCollapseSkillName = (skillNameId: string) => {
    setExpandedSkillNameIds(prevExpandedSkillNameIds => {
      const expanded = prevExpandedSkillNameIds[skillNameId]

      return {
        ...prevExpandedSkillNameIds,
        [skillNameId]: !expanded
      }
    })
  }

  return { expandedSkillNameIds, expandCollapseSkillName }
}
