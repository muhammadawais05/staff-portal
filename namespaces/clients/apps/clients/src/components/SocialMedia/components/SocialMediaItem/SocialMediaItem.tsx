import React, { ReactElement, ReactNode } from 'react'
import { Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { QueryResult, EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'
import { LinkOverflow } from '@staff-portal/client-representatives'

type Input = PatchClientProfileInput

interface Props {
  disabled: boolean
  initialValues: Partial<Input>
  handleOnChange: (key: keyof Input, values: Partial<Input>) => void
  queryValue: () => QueryResult<string>
  value?: string
  name: keyof Input
  webResource?: { text: string; url?: string | null } | null
  icon?: ReactElement
  children?: ReactNode
}

const SocialMediaItem = ({
  disabled,
  queryValue,
  initialValues,
  handleOnChange,
  value = '',
  name,
  webResource,
  children,
  icon
}: Props) => {
  return (
    <>
      <EditableField<PatchClientProfileInput, string>
        width='small'
        disabled={disabled}
        onChange={handleOnChange}
        initialValues={initialValues}
        queryValue={queryValue}
        value={value}
        name={name}
        updateOnBlur
        icon={icon}
        editor={props => (
          <Form.Input {...props} autoFocus size='small' width='full' />
        )}
        viewer={
          webResource?.url ? (
            <LinkOverflow
              link={{ url: webResource.url, text: webResource.text }}
              target='_blank'
              rel='noopener'
              data-testid={`EditableField-viewer-${name}`}
            />
          ) : (
            NO_VALUE
          )
        }
      />
      {children}
    </>
  )
}

export default SocialMediaItem
