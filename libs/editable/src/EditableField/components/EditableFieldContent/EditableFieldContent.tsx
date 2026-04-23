import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Button,
  Container,
  Loader,
  Tooltip,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { useForm, useFormState } from '@toptal/picasso-forms'
import { Pencil16 } from '@toptal/picasso/Icon'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import { EditableFieldContentProps } from '../../types'
import { editorContainer } from './styles'
import useGetQueryErrors from './utils'

// TODO: remove temporary components
const noop = () => { }

// eslint-disable-next-line complexity
const EditableFieldContent = <TMutationInput, TQueryValue, TQueryOptions>({
  editor: EditorComponent,
  viewer: ViewerComponent,
  icon: IconComponent,
  closeOnEscape = true,
  disabled = false,
  submitOnChange = true,
  updateOnBlur = false,
  fullWidthEditor = false,
  showBaseErrorContainer = true,
  name,
  tooltipMessage,
  tooltipPlacement = 'top',
  width = 'full',
  multiline = false,
  onError,
  onReset,
  queryValue: useQueryValue,
  queryOptions: useQueryOptions = () => ({
    data: undefined,
    loading: false,
    error: undefined,
    request: noop
  }),
  ...containerProps
}: Omit<
  EditableFieldContentProps<TMutationInput, TQueryValue, TQueryOptions>,
  'onChange'
>) => {
  const {
    request: requestData,
    data,
    error: dataError,
    loading: loadingData
  } = useQueryValue()
  const {
    request: requestOptions,
    data: options,
    error: optionsError,
    loading: loadingOptions
  } = useQueryOptions()
  const { reset, submit } = useForm<TMutationInput>()
  const { hasSubmitErrors, submitting } = useFormState()
  const isSubmitting = useRef(false)
  const [isToggled, setIsToggled] = useState(false)

  const loading = loadingData || loadingOptions
  const isUpdating = submitting || loading
  const isSidebarVisible =
    !fullWidthEditor || (fullWidthEditor && (!isToggled || loading))

  const handleToggle = () => {
    // make data up to date, could have been changed in another tab or in background
    requestData()
    // request options, we're requesting them each time, because they also could have been changed
    requestOptions?.()
    // reverse toggle state
    setIsToggled(state => !state)
  }

  const handleBlur = async () => {
    if (submitOnChange && updateOnBlur) {
      await submit()
    }
  }

  const handleChange = async () => {
    if (submitOnChange && !updateOnBlur) {
      await submit()
    }
  }

  const handleReset = useCallback(() => {
    onReset?.()
    reset()
    setIsToggled(false)
  }, [onReset, reset])

  useEffect(() => {
    if (!closeOnEscape) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isUpdating && event.key === 'Escape') {
        handleReset()
        setIsToggled(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeOnEscape, handleReset, isUpdating, reset, setIsToggled])

  useEffect(() => {
    if (hasSubmitErrors) {
      if (!isToggled) {
        reset()
      }

      onError?.()
    }

    if (!submitting && isSubmitting.current) {
      if (!hasSubmitErrors) {
        setIsToggled(false)
        // TODO: remove this when working on https://toptal-core.atlassian.net/browse/SPB-2770
        reset()
      }
    }

    isSubmitting.current = submitting
  }, [submitting, isSubmitting, isToggled, hasSubmitErrors, onError, reset])

  useGetQueryErrors([dataError, optionsError], { isToggled, setIsToggled })

  const content = (
    <Container flex {...containerProps}>
      {isToggled && !loading ? (
        <Container css={editorContainer({ width })}>
          {showBaseErrorContainer && <FormBaseErrorContainer />}

          <EditorComponent
            // this won't affect react-final-form fields, because they are taking value from `initialValues` of the form
            // but it allows passing of `value` prop to independent components
            data-testid={`EditableField-${name}-editor`}
            value={data}
            options={options}
            disabled={disabled || submitting}
            name={name}
            onBlur={handleBlur}
            onChange={handleChange}
            onReset={handleReset}
          />
        </Container>
      ) : typeof ViewerComponent === 'string' ? (
        multiline ? (
          <Typography weight='semibold' size='medium'>
            {ViewerComponent}
          </Typography>
        ) : (
          <TypographyOverflow weight='semibold' size='medium'>
            {ViewerComponent}
          </TypographyOverflow>
        )
      ) : (
        ViewerComponent
      )}
      {isSidebarVisible && (
        <Container left='xsmall' flex alignItems='flex-start'>
          {isUpdating && (
            <Container
              top={0.3}
              bottom={0.2}
              left={0.1}
              right={0.1}
              alignItems='flex-start'
            >
              <Loader size='small' data-testid='EditableField-loader' />
            </Container>
          )}
          {!(isToggled || disabled) && (
            <Button.Circular
              disabled={disabled || isToggled}
              icon={<Pencil16 color='dark-grey' />}
              onClick={handleToggle}
              variant='transparent'
              data-testid={`EditableField-toggle-button-${name}`}
            />
          )}
          {!isUpdating && !isToggled && IconComponent}
        </Container>
      )}
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
      data-testid='EditableField-tooltip'
    >
      {content}
    </Tooltip>
  )
}

export default EditableFieldContent
