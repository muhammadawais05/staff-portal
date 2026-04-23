import React from 'react'
import { Typography } from '@toptal/picasso'

import { TalentSkillSetVettedResultFragment } from '../../../../../../../../data/talent-skill-set-vetted-result-fragment'
import { calculateNotVettedMessage } from './utils'

export interface Props {
  vettedResult?: TalentSkillSetVettedResultFragment | null
}

const NotVettedSkill = ({ vettedResult }: Props) => {
  return <Typography data-testid='not-vetted-skill'>
    {calculateNotVettedMessage(vettedResult)}
  </Typography>
}

NotVettedSkill.displayName = 'NotVettedSkill'

export default NotVettedSkill
