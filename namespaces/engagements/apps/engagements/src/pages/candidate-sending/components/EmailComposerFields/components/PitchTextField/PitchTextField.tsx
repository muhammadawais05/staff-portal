import React from 'react'
import { Form } from '@toptal/picasso-forms'

import BaseEmailComposerField from '../BaseEmailComposerField/BaseEmailComposerField'

export type Props = {
  isPitchTextEnabled: boolean
}

const pitchTextExperimentNotation =
  '(Disabled as part of an experiment to see the effect of pitch text to conversion)'

const PitchTextField = ({ isPitchTextEnabled }: Props) => (
  <BaseEmailComposerField
    label={`Pitch Text ${
      !isPitchTextEnabled ? pitchTextExperimentNotation : ''
    }`}
  >
    <Form.Input
      disabled={!isPitchTextEnabled}
      name='pitchText'
      multiline
      rowsMin={15}
      width='full'
      data-testid='PitchTextField-Input'
    />
  </BaseEmailComposerField>
)

export default PitchTextField
