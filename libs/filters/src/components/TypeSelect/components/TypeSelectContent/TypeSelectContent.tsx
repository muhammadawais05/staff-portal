import React, { useState, useMemo } from 'react'
import { Container, Button, SkeletonLoader, EmptyState } from '@toptal/picasso'

import { Option } from '../../types'
import TypeSelectSearchInput from '../TypeSelectSearchInput'
import TypeSelectOption from '../TypeSelectOption'
import * as S from './styles'

const getFilteredOptions = (options: Option[], searchTerm: string) => {
  if (!options.length || !searchTerm) {
    return options
  }
  const parsedSearchTerm = searchTerm.toLowerCase()

  return options.filter(option => {
    const label = option.label.toLowerCase()
    const matchCategory = label.includes(parsedSearchTerm)
    const hasSingleChild = option.children?.length === 1
    const matchSubcategory = option.children?.some(child => {
      const childLabel = child.label.toLowerCase()

      return childLabel.includes(parsedSearchTerm)
    })

    return matchCategory || (matchSubcategory && !hasSingleChild)
  })
}

const getInitialOptions = (options: Option[], selectedOptions?: Option[]) => {
  if (selectedOptions) {
    return options.map(option => {
      const isSelected = (item: Option) =>
        selectedOptions.some(({ id }) => id === item.id)

      return {
        ...option,
        selected: isSelected(option),
        children: option.children?.map(child => ({
          ...child,
          selected: !isSelected(option) && isSelected(child)
        }))
      }
    })
  }

  return options.map(option => {
    return {
      ...option,
      selected: false,
      children: option.children?.map(child => ({
        ...child,
        selected: false
      }))
    }
  })
}

interface Props {
  options?: Option[]
  selectedOptions?: Option[]
  onSelectionChange: (options?: Option[]) => void
  searchPlaceholder?: string
  loading?: boolean
}

const TypeSelectContent = ({
  options: initialOptions = [],
  selectedOptions,
  onSelectionChange,
  searchPlaceholder,
  loading
}: Props) => {
  const options = useMemo(
    () => getInitialOptions(initialOptions, selectedOptions),
    [initialOptions, selectedOptions]
  )
  const [searchTerm, setSearchTerm] = useState<string>('')

  const filteredOptions = useMemo<Option[]>(
    () => getFilteredOptions(options, searchTerm),
    [options, searchTerm]
  )

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm)
  }

  const handleSelect = (selectedOption: Option) => {
    let newSelectedOptions = [...options] as Option[]
    const selectedIndex = newSelectedOptions.findIndex(
      ({ id }) => id === selectedOption.id
    )

    newSelectedOptions[selectedIndex] = selectedOption
    newSelectedOptions = newSelectedOptions
      .map(({ selected, id, label, children }) => {
        if (selected) {
          return {
            id,
            label
          }
        }

        return (
          children
            ?.filter(child => child.selected)
            .map(child => ({
              id: child.id,
              label: child.label
            })) || []
        )
      })
      .flat()

    onSelectionChange(newSelectedOptions)
  }

  const handleDeselectAll = () => {
    onSelectionChange()
  }

  const handleSelectAll = () => {
    onSelectionChange(
      options.map(({ id, label }) => ({
        id,
        label
      }))
    )
  }

  return (
    <Container padded='small'>
      <TypeSelectSearchInput
        onChange={handleSearch}
        placeholder={searchPlaceholder}
        loading={loading}
      />
      <Container data-testid='type-select-content' css={S.content} top='small'>
        {loading ? (
          <SkeletonLoader.Typography rows={11} />
        ) : (
          <>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <TypeSelectOption
                  option={option}
                  onSelect={handleSelect}
                  key={option.id}
                  searchTerm={searchTerm}
                />
              ))
            ) : (
              <EmptyState.Collection data-testid='employments-empty'>
                No options
              </EmptyState.Collection>
            )}
          </>
        )}
      </Container>
      <Container padded='small' css={S.actionButtons}>
        <Button
          data-testid='type-select-select-all'
          variant='secondary'
          size='small'
          onClick={handleSelectAll}
          disabled={loading}
        >
          Select All
        </Button>
        <Button
          data-testid='type-select-deselect-all'
          variant='secondary'
          size='small'
          onClick={handleDeselectAll}
          disabled={loading}
        >
          Deselect All
        </Button>
      </Container>
    </Container>
  )
}

export default TypeSelectContent
