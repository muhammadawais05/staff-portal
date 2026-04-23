import React from 'react'

interface Props {
  skills: string[] | undefined
}

const SkillsList = ({ skills }: Props) => {
  return (
    <>
      {skills && (
        <div data-testid='skillsList'>
          {skills.map(skill => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      )}
    </>
  )
}

export default SkillsList
