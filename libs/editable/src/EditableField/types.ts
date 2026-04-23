import { ComponentProps, ComponentType, ReactElement, ReactNode } from 'react'
import { Tooltip } from '@toptal/picasso'
import { SubmissionErrors } from '@toptal/picasso-forms'
import { Props as ContainerProps } from '@toptal/picasso/Container/Container'
import { Item } from '@toptal/picasso/TagSelector'
import { ApolloError } from '@staff-portal/data-layer-service'

export type ValueOf<T> = T[keyof T]

export type ValuesToAdjust<
  TMutationInput extends Partial<Record<TKey, unknown>>,
  TKey extends keyof TMutationInput,
  TQueryValue = string
  > = Partial<Record<TKey, TQueryValue>>

export interface QueryResult<TValue> {
  request: () => void
  loading: boolean
  error: ApolloError | undefined
  data: TValue | undefined
}

export interface EditorProps<TMutationInput, TQueryValue, TQueryOptions> {
  value: TQueryValue | undefined
  options: TQueryOptions | undefined
  name: keyof TMutationInput
  disabled: boolean
  enableReset?: boolean
  'data-testid'?: string
  onBlur: () => void
  onChange: () => void
  onReset?: () => void
}

export type EditableFieldContentWidth = 'small' | 'full' | 'auto'

export interface EditableFieldContentProps<
  TMutationInput,
  TQueryValue,
  TQueryOptions,
  TKey extends keyof TMutationInput = keyof TMutationInput
  > extends Omit<
  ContainerProps,
  'defaultValue' | 'children' | 'classes' | 'onChange'
  > {
  multiline?: boolean
  width?: EditableFieldContentWidth
  viewer: ReactElement | ComponentType | string
  icon?: ReactElement | ComponentType
  editor: ComponentType<EditorProps<TMutationInput, TQueryValue, TQueryOptions>>
  /**
   * when user presses ESC, cancel (return to viewer mode) will be triggered
   */
  closeOnEscape?: boolean
  /**
   * todo : rename this prop to an `editIsNotAllowed`, since `disabled` is often confused with `isOperationDisabled` result
   * https://toptal-core.atlassian.net/browse/SPB-2838
   */
  disabled?: boolean
  name: TKey
  onChange: (
    key?: keyof TMutationInput,
    value?: ValueOf<TMutationInput>
  ) => void
  onError?: () => void
  onReset?: () => void
  /**
   * We are obliged to make a lazy request to make value up to date on edit
   */
  queryValue: () => QueryResult<TQueryValue>
  /**
   * Lazy request of possible to select options (usually used for dropdowns)
   */
  queryOptions?: () => QueryResult<TQueryOptions>
  /**
   * when user changes a value, submit will be triggered
   */
  submitOnChange?: boolean
  /**
   * use to hide the base error container
   */
  showBaseErrorContainer?: boolean
  tooltipMessage?: ReactNode
  tooltipPlacement?: ComponentProps<typeof Tooltip>['placement']
  /**
   * when user clicks outside of the field, submit will be triggered
   */
  updateOnBlur?: boolean
  /**
   * there will be no spacing on the right of the field
   */
  fullWidthEditor?: boolean
}

export interface EditableFieldProps<
  TMutationInput,
  TQueryValue = string,
  TQueryOptions = Item[],
  TKey extends keyof TMutationInput = keyof TMutationInput
  > extends Omit<
  EditableFieldContentProps<TMutationInput, TQueryValue, TQueryOptions, TKey>,
  'onChange'
  > {
  value?: TQueryValue
  adjustValues?: (
    values: Partial<TMutationInput> &
      ValuesToAdjust<TMutationInput, TKey, TQueryValue>
  ) => Partial<TMutationInput>
  initialValues?: Partial<TMutationInput>
  onChange: (
    key: keyof TMutationInput,
    values: Partial<TMutationInput>
  ) => SubmissionErrors | Promise<SubmissionErrors> | void
}
