import { Container, Tooltip } from '@toptal/picasso'
import { Form as PicassoForm, useField, useForm } from '@toptal/picasso-forms'
import React, { useState } from 'react'
import { Maybe } from '@staff-portal/graphql/staff'

export type Props = {
  name: string
  required?: boolean
  horizontal?: boolean
  options: {
    description?: string
    label: string
    value?: Maybe<string> | Maybe<number>
  }[]
}

const DraftJobFormRadioGroup = ({
  name,
  required,
  horizontal = true,
  options
}: Props) => {
  const form = useForm()
  const field = useField(name)

  const [openTooltipValue, setOpenTooltipValue] = useState<
    string | null | undefined
  >()

  const handleNullSelect = () => {
    form.change(name, null)
  }

  return (
    <PicassoForm.RadioGroup
      horizontal={horizontal}
      name={name}
      required={required}
      // without this custom parse function keys with null values are removed from the form
      // then overwriting with n/a when editing an existing draft job would not be possible
      parse={value => value || null}
      allowNull
    >
      {options?.map(({ description, label, value }) => {
        const normalizedValue: string | null | undefined =
          typeof value === 'number' ? value.toString() : value

        // control the Tooltip programatically
        // otherwise it's only shown hovering the label, not the radio button itself
        const handleMouseOver = () => setOpenTooltipValue(normalizedValue)
        const handleMouseOut = () => setOpenTooltipValue(undefined)
        const isTooltipOpen = normalizedValue === openTooltipValue

        const labelElement = (
          <Container
            as='span'
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            {label}
          </Container>
        )
        const labelWithTooltip = description ? (
          <Tooltip content={description} open={isTooltipOpen}>
            {labelElement}
          </Tooltip>
        ) : (
          labelElement
        )

        const isNullSelected = !field.input.value

        // the N/A radio buttons represent a null value for their corresponding field
        // the Radio component doesn't support a null value for a controlled component
        // so handle checked / onSelect manually for the Radio button representing the null value
        return normalizedValue === null ? (
          <PicassoForm.Radio
            key='null'
            label={labelWithTooltip}
            onSelect={handleNullSelect}
            checked={isNullSelected}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        ) : (
          <PicassoForm.Radio
            key={normalizedValue}
            label={labelWithTooltip}
            value={normalizedValue}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          />
        )
      })}
    </PicassoForm.RadioGroup>
  )
}

export default DraftJobFormRadioGroup
