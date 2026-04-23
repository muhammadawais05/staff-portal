import React from 'react'

interface Props {
  skills: string[]
}

const SkillsList = ({ skills }: Props) => (
  <div data-testid='skills-list'>
    <div>Skills</div>
    <div>{skills.join(',')}</div>
  </div>
)

export default SkillsList
