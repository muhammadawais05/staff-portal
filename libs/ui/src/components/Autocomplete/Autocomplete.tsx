import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  useMemo
} from 'react'
// eslint-disable-next-line no-restricted-imports
import { Autocomplete as PicassoAutocomplete } from '@toptal/picasso'
import type { AutocompleteProps } from '@toptal/picasso/Autocomplete'
import type { Item } from '@toptal/picasso/Autocomplete/types'

import { getFilteredOptions } from './utils'

export type Props<TItem extends Item = Item> = Omit<
  AutocompleteProps,
  'getKey' | 'getDisplayValue' | 'options' | 'renderOption' | 'onSelect'
> & {
  renderOption?: (item: TItem, index: number) => ReactNode
  getDisplayValue?: (item: TItem | null) => string
  getKey?: (item: TItem) => string | null | undefined
  options: TItem[] | null | undefined
  onSelect?: (item: TItem, event: MouseEvent | KeyboardEvent) => void
}

export const Autocomplete = forwardRef<HTMLInputElement, Props>(
  <TItem extends Item>(
    {
      options,
      renderOption,
      getDisplayValue,
      getKey,
      onSelect,
      ...rest
    }: Props<TItem>,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const filteredOptions = useMemo(
      () => (options ? getFilteredOptions<TItem>(options, getKey) : options),
      [options, getKey]
    )

    return (
      <PicassoAutocomplete
        // Fix for https://toptal-core.atlassian.net/browse/ER-17876 to not exceed the size limit
        maxLength={2048}
        ref={ref}
        options={filteredOptions}
        getKey={getKey as unknown as AutocompleteProps['getKey']}
        getDisplayValue={
          getDisplayValue as AutocompleteProps['getDisplayValue']
        }
        renderOption={
          renderOption as unknown as AutocompleteProps['renderOption']
        }
        onSelect={onSelect as unknown as AutocompleteProps['onSelect']}
        {...rest}
      />
    )
  }
) as <TItem extends Item = Item>(
  props: Props<TItem> & { ref?: Ref<HTMLDivElement> }
) => ReactElement

export default Autocomplete
