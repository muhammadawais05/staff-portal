import React, {
  FC,
  memo,
  useState,
  ReactElement,
  useEffect,
  useCallback
} from 'react'
import {
  Button,
  Container,
  SpacingType,
  ButtonVariantType
} from '@toptal/picasso'
import { Form, useFormState, useForm } from '@toptal/picasso-forms'
import { noop } from '@toptal/picasso/utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import i18n from '../../utils/i18n'
import { OperationItemFragment } from '../../__fragments__/operationItemFragment.graphql.types'
import * as S from './styles'
import OperationWrapper from '../OperationWrapper'

const displayName = 'FormContent'

export interface FormContentProps {
  striped?: boolean
  operation?: OperationItemFragment
  label: ReactElement | string
  buttonText?: string
  buttonVariant?: ButtonVariantType
  saveButtonText?: string
  saveButtonComponent?: ReactElement
  cancelButtonText?: string
  onReset?: () => void
  onClose?: () => void
  editComponent: ReactElement
  padded?: SpacingType
  left?: SpacingType
  right?: SpacingType
  loading?: boolean
}

const FormContent: FC<FormContentProps> = memo(
  ({
    striped = false,
    operation = { callable: OperationCallableTypes.ENABLED, messages: [] },
    label,
    buttonText = 'Edit',
    buttonVariant = 'secondary',
    children,
    editComponent,
    saveButtonComponent,
    onReset = noop,
    onClose,
    saveButtonText = i18n.t('common:actions.update'),
    cancelButtonText = i18n.t('common:actions.cancel'),
    padded,
    left,
    right,
    loading = false
  }) => {
    const [inlineMode, setInlineMode] = useState(false)
    const { submitSucceeded, submitFailed } = useFormState()
    const { reset } = useForm()
    const showInlineEditor = useCallback(() => setInlineMode(true), [])
    const close = useCallback(() => {
      setInlineMode(false)
      onReset()
      reset()
    }, [onReset])

    useEffect(() => {
      if (inlineMode && submitSucceeded && !submitFailed) {
        close()
        reset()
      }
    }, [inlineMode, submitSucceeded, close, reset, submitFailed])

    return (
      <Container css={striped ? S.stripedRow : ''} data-testid={displayName}>
        <Container
          padded={padded}
          left={left}
          right={right}
          flex
          justifyContent='space-between'
        >
          <Container flex css={S.flexGrow}>
            {label}
          </Container>
          {inlineMode ? (
            <Container>
              <Button
                data-testid='cancel'
                size='small'
                variant='secondary'
                onClick={onClose || close}
              >
                {cancelButtonText}
              </Button>
              {saveButtonComponent || (
                <Form.SubmitButton
                  size='small'
                  data-testid='submit'
                  variant='positive'
                >
                  {saveButtonText}
                </Form.SubmitButton>
              )}
            </Container>
          ) : (
            <OperationWrapper operation={operation}>
              <Button
                variant={buttonVariant}
                data-testid='edit'
                loading={loading}
                onClick={showInlineEditor}
                size='small'
              >
                {buttonText}
              </Button>
            </OperationWrapper>
          )}
        </Container>
        {inlineMode ? editComponent : children}
      </Container>
    )
  }
)

FormContent.displayName = displayName

export default FormContent
