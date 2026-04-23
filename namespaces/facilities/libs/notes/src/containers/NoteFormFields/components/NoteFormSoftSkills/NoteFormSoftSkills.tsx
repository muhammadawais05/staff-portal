import { Container, Form, Grid, Typography } from '@toptal/picasso'
import {
  Form as PicassoForm,
  FieldArray,
  useFieldArray
} from '@toptal/picasso-forms'
import React from 'react'

import { NoteFormSoftSkill } from '../../../../types'
import NoteFormSoftSkillsRating from '../NoteFormSoftSkillsRating'
import NoteFormGroupHeader from '../NoteFormGroupHeader'

export interface Props {
  startCounter?: number
}

const NoteFormSoftSkills = ({ startCounter = 0 }: Props) => {
  const {
    fields: { value: skills }
  } = useFieldArray<NoteFormSoftSkill>('softSkills')

  let counterIndex = startCounter + 1

  return (
    <Container top='medium' bottom='medium'>
      <NoteFormGroupHeader title='Soft Skills' />

      <FieldArray name='softSkills'>
        {({ fields }) =>
          fields.map((softSkillName, softSkillIndex) => (
            <Grid key={softSkillName} alignItems='baseline'>
              <Grid.Item small={4}>
                <Form.Label titleCase={false} requiredDecoration='asterisk'>
                  <Typography size='medium' inline>
                    {counterIndex++}. {skills[softSkillIndex].softSkill.name}
                  </Typography>
                </Form.Label>
              </Grid.Item>

              <Grid.Item small={8}>
                <NoteFormSoftSkillsRating
                  name={softSkillName}
                  ratingHints={skills[softSkillIndex].softSkill.ratingHints}
                />

                <Container top='xsmall'>
                  <PicassoForm.Input
                    multiline
                    rowsMin={3}
                    width='full'
                    name={`${softSkillName}.comment`}
                  />
                </Container>
              </Grid.Item>
            </Grid>
          ))
        }
      </FieldArray>
    </Container>
  )
}

export default NoteFormSoftSkills
