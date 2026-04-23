import React from 'react'
import { Form as PicassoForm } from '@toptal/picasso'
import { FieldArray, Form } from '@toptal/picasso-forms'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import EngagementItemContent from '../EngagementItemContent'

interface Props {
  engagements: NonNullable<SurveyEngagementFragment['engagements']>
}

const CommentsField = ({ engagements }: Props) => (
  <FieldArray name='comments'>
    {({ fields }) =>
      fields.map((name, index) => (
        <PicassoForm.Field key={name}>
          <PicassoForm.Label>
            <EngagementItemContent
              jobLink={engagements.nodes[index].job?.webResource}
              talentLink={engagements.nodes[index].talent?.webResource}
              verticalName={engagements.nodes[index].job?.vertical?.name}
              prependContent='Comments for'
            />
          </PicassoForm.Label>
          <Form.Input
            name={`${name}.comment`}
            width='full'
            multiline
            rows={4}
            placeholder='Enter any comments or feedback from the client about the specific engagement'
            data-testid='leave-feedback-modal-comment-field'
          />
        </PicassoForm.Field>
      ))
    }
  </FieldArray>
)

export default CommentsField
