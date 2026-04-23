import React from 'react'
import {
  Container,
  Table,
  Tooltip,
  Info16,
  Form as PicassoForm,
  Typography
} from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

import * as S from './styles'
import { useCandidateSendingContext } from '../../hooks'
import getTooltipContent from './utils/get-tooltip-content/get-tooltip-content'

type Props = {
  id: string
}

const RejectedApplicationFeedbackCell = ({ id }: Props) => {
  const { newEngagementWizardMutationPayload } = useCandidateSendingContext()
  const { internalFeedbackTitleAndSlugs, internalFeedbackTooltips } =
    newEngagementWizardMutationPayload?.rejectionFeedback || {}

  return (
    <Table.Cell>
      <PicassoForm.Label htmlFor={`${id}.feedback`}>
        <Typography weight='semibold'>
          Feedback to share with talent:
        </Typography>
      </PicassoForm.Label>
      <Form.Input
        data-testid={`rejected-application-feedback-cell-feedback-${id}`}
        name={`${id}.feedback`}
        multiline
        rowsMin={6}
        width='full'
        titleCase={false}
      />

      <Container top='medium' bottom='xsmall'>
        <Container bottom='xsmall'>
          <PicassoForm.Label>
            <Typography weight='semibold'>Internal feedback:</Typography>
          </PicassoForm.Label>
        </Container>

        <Form.CheckboxGroup name={`${id}.internalFeedback`}>
          {internalFeedbackTitleAndSlugs?.map(item => (
            <Container
              key={`${id}-${item.key}`}
              flex
              alignItems='center'
              css={S.checkboxItemContainer}
            >
              <Form.Checkbox
                name={`${id}.internalFeedback.${item.key}`}
                label={item.value}
                titleCase={false}
              />

              <Tooltip
                content={getTooltipContent({
                  key: item.key,
                  tooltips: internalFeedbackTooltips
                })}
              >
                <Container as='span' left='xsmall' flex>
                  <Info16 />
                </Container>
              </Tooltip>
            </Container>
          ))}
        </Form.CheckboxGroup>
      </Container>
    </Table.Cell>
  )
}

export default RejectedApplicationFeedbackCell
