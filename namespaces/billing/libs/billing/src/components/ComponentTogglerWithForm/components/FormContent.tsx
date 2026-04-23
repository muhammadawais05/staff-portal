import { useForm, useFormState, FormSpy } from '@toptal/picasso-forms'
import React, {
  ComponentProps,
  ComponentType,
  ReactElement,
  useEffect
} from 'react'
import { Container, Tooltip } from '@toptal/picasso'
import { Props as ContainerProps } from '@toptal/picasso/Container/Container'

import {
  DefaultToggleButton,
  ToggleButtonClickEvent,
  ToggleProps
} from './DefaultToggleButton'
import { OperationItemFragment } from '../../../__fragments__/operationItemFragment.graphql.types'

interface FormProps {
  submitting?: boolean
  updating?: boolean
}

export interface Props extends Omit<ContainerProps, 'children' | 'classes'> {
  ComponentA: ComponentType
  ComponentB: ComponentType<FormProps>
  ToggleButton?: ComponentType<ToggleProps>
  disabled?: boolean
  isToggled: boolean
  onToggle: ToggleButtonClickEvent
  toggleButtonPosition?: 'start' | 'end'
  tooltipMessage?: string
  tooltipPlacement?: ComponentProps<typeof Tooltip>['placement']
  updating?: boolean
  operation?: OperationItemFragment
  icon?: ReactElement
}

export const FormContent = (props: Props) => {
  const {
    ComponentA,
    ComponentB,
    ToggleButton = DefaultToggleButton,
    disabled,
    isToggled,
    onToggle,
    toggleButtonPosition = 'end',
    tooltipMessage,
    tooltipPlacement = 'top',
    updating = false,
    operation,
    icon,
    ...containerProps
  } = props

  const toggleButtonAtStart = toggleButtonPosition === 'start'
  const { reset } = useForm()
  const { hasSubmitErrors } = useFormState()

  useEffect(() => {
    if (!isToggled && hasSubmitErrors) {
      reset()
    }
  }, [isToggled, hasSubmitErrors, reset])

  /**
   *   TODO: once this functionality is added into ComponentTogglerWithForm, hook should be removed
   *   ticket https://toptal-core.atlassian.net/browse/SPB-2083
   */
  useEffect(() => {
    const handleOnKeyDown = ({ key }: KeyboardEvent) => {
      if (key === 'Escape' && isToggled) {
        onToggle()
      }
    }

    document.addEventListener('keydown', handleOnKeyDown)

    return () => {
      document.removeEventListener('keydown', handleOnKeyDown)
    }
  }, [isToggled, onToggle])

  const content = (
    <Container data-testid='componentTogglerWithForm' {...containerProps}>
      <FormSpy subscription={{ submitting: true }}>
        {({ submitting }) => {
          const toggleButton = (
            <ToggleButton
              onClick={onToggle}
              disabled={disabled}
              submitting={submitting}
              updating={updating}
              icon={icon}
              operation={operation}
            />
          )

          return (
            <>
              {toggleButtonAtStart && toggleButton}
              {isToggled ? (
                <ComponentB updating={updating} submitting={submitting} />
              ) : (
                <ComponentA />
              )}
              {!toggleButtonAtStart && toggleButton}
            </>
          )
        }}
      </FormSpy>
    </Container>
  )

  if (!tooltipMessage) {
    return content
  }

  return (
    <Tooltip
      content={tooltipMessage}
      maxWidth='none'
      placement={tooltipPlacement}
    >
      {content}
    </Tooltip>
  )
}
