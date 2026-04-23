import React, { PropsWithChildren, useMemo, ReactNode } from 'react'
import { Container, Form, QuestionMark16, Tooltip } from '@toptal/picasso'

type Choice<TValue extends string> = {
  value: TValue

  label: React.ReactNode
  tooltip?: string
  disabled?: boolean
}

export type Props<TValue extends string = string> = {
  name: string
  label?: string
  horizontal?: boolean

  disabledOptions?: TValue[] | null
  choices: Choice<TValue>[]

  Group: React.ComponentType<{ horizontal: boolean; name: string }>
  Input: React.ComponentType<{
    disabled: boolean
    label: React.ReactNode
    value: TValue
  }>
}

const LabelWithIcon = ({ children }: { children: ReactNode }) => {
  return (
    <Container flex alignItems='center'>
      {children}
      <QuestionMark16 color='grey' css={{ paddingLeft: '.25rem' }} />
    </Container>
  )
}

const GroupField: <TValue extends string>(
  props: PropsWithChildren<Props<TValue>>
) => React.ReactElement = ({
  disabledOptions,
  name,
  label: fieldLabel,
  choices,
  horizontal = false,
  children,
  Group,
  Input
}) => {
  const choicesWithDisabled = useMemo(
    () =>
      choices.map(choice => ({
        ...choice,
        disabled: !!disabledOptions?.includes(choice.value)
      })),
    [choices, disabledOptions]
  )

  return (
    <Form.Field>
      <Form.Label>{fieldLabel}</Form.Label>

      <Group name={name} horizontal={horizontal}>
        {choicesWithDisabled.map(({ tooltip, disabled, value, label }) => (
          <React.Fragment key={value}>
            {tooltip ? (
              <Tooltip content={tooltip}>
                <Container>
                  <Input
                    value={value}
                    disabled={disabled}
                    label={<LabelWithIcon>{label}</LabelWithIcon>}
                  />
                </Container>
              </Tooltip>
            ) : (
              <Input value={value} label={label} disabled={disabled} />
            )}
          </React.Fragment>
        ))}

        {children}
      </Group>
    </Form.Field>
  )
}

export default GroupField
