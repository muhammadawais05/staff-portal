/* eslint-disable no-console */
import { Container } from '@toptal/picasso'
import { Form, useForm } from '@toptal/picasso-forms'
import React from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'

import { NoteFormAnswerBuilderType } from '../../../../types'

const NoteFormRadioButtons = ({
  index,
  options,
  required,
  disabled
}: NoteFormAnswerBuilderType) => {
  const { change, focus } = useForm()

  const answerName = `answers[${index}]`
  const radioGroupName = `${answerName}.optionId`

  return (
    <>
      <Form.RadioGroup horizontal required={required} name={radioGroupName}>
        {options?.map(({ id, label, value }) => (
          <WrapWithTooltip
            key={id}
            enableTooltip={value !== label}
            content={label}
          >
            {/* Remove span wrapper when https://toptal-core.atlassian.net/browse/FX-1988 will be done */}
            <span>
              <Form.Radio
                titleCase={false}
                disabled={disabled}
                value={id}
                label={value}
                onChange={() => {
                  change(`${answerName}.value`, value)

                  // Safari only: formState.active is not updated when a radio button is clicked so we need to focus it manually.
                  // See: https://toptal-core.atlassian.net/browse/SCR-2888
                  focus(radioGroupName)
                }}
              />
            </span>
          </WrapWithTooltip>
        ))}
      </Form.RadioGroup>

      {/* When the BE returns an error related to this option ID, is using the value field, answers.index.value */}
      <Container>
        <Form.Input type='hidden' name={`answers[${index}].value`} />
      </Container>
    </>
  )
}

export default NoteFormRadioButtons
