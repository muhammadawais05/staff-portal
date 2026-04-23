import React from 'react'
import { Tag } from '@toptal/picasso'

import { Wrapper } from './styles'

interface Props {
  skills: string[] | undefined
  padded?: boolean
  handleDelete?: (value: string) => void
  editMode: boolean
}

const SkillsList = ({ skills, padded, editMode, handleDelete }: Props) => {
  return (
    <>
      {skills && (
        <Wrapper flex padded={padded} data-testid='skillsList'>
          <Tag.Group>
            {skills.map(skill => (
              <Tag
                key={skill}
                onDelete={editMode ? () => handleDelete?.(skill) : undefined}
                titleCase={false}
              >
                {skill}
              </Tag>
            ))}
          </Tag.Group>
        </Wrapper>
      )}
    </>
  )
}

export default SkillsList
