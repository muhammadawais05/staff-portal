import { SelectOption, SizeType } from '@toptal/picasso'

export interface EditorProps<Value> {
  value?: Value
  options?: SelectOption[]
  error?: boolean
  required?: boolean
  size?: SizeType<'small' | 'medium'>
  onChange: (value?: Value) => void
  onBlur: () => void
  onReset: () => void
  onError: (value: boolean) => void
}
