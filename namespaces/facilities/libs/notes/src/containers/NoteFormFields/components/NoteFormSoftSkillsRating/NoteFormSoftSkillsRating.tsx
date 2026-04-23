import { Tooltip, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React from 'react'

import { NoteSoftSkillRatingHintFragment } from '../../../../data/note-soft-skill-fragment'
import { SOFT_SKILL_RATING_MAPPING } from '../../../../config'

export interface Props {
  name: string
  ratingHints: NoteSoftSkillRatingHintFragment[]
}

const NoteFormSoftSkillsRating = ({ name, ratingHints }: Props) => {
  return (
    <Form.RadioGroup horizontal name={`${name}.value`}>
      {ratingHints.map(({ value, description, title }) => (
        <Tooltip
          key={value}
          content={
            <>
              <Typography size='medium' weight='semibold'>
                {title}
              </Typography>
              <Typography size='medium'>{description}</Typography>
            </>
          }
        >
          {/* Remove span wrapper when https://toptal-core.atlassian.net/browse/FX-1988 will be done */}
          <span>
            <Form.Radio
              key={value}
              value={value}
              label={SOFT_SKILL_RATING_MAPPING[value]}
            />
          </span>
        </Tooltip>
      ))}
    </Form.RadioGroup>
  )
}

export default NoteFormSoftSkillsRating
