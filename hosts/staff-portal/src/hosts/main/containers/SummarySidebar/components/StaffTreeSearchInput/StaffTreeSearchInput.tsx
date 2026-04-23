import React, {
  useRef,
  useEffect,
  useState,
  KeyboardEvent as SyntheticKeyboardEvent
} from 'react'
import { Input, Typography } from '@toptal/picasso'
import { Search16 } from '@toptal/picasso/Icon'
import { useDebouncedCallback } from 'use-debounce'
import { DEFAULT_INPUT_DEBOUNCE_DELAY } from '@staff-portal/config'

import { TreeNodeWithInfo } from '../StaffTreeModal/types'
import { searchTree, resetTree } from './utils'

const F_KEY_CODE = 70

export interface Props {
  treeData: TreeNodeWithInfo | undefined
  onChange: (searchedTreeData: TreeNodeWithInfo) => void
}

const StaffTreeSearchInput = ({ treeData, onChange }: Props) => {
  const [searchInputValue, setSearchInputValue] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [matchesCount, setMatchesCount] = useState(0)

  const handleNewSearchTerm = () => {
    if (!treeData) {
      return
    }

    const searchValue = searchInputValue.trim()

    if (searchValue) {
      const { searchedTreeData, matchesCount: nextMatchesCount } = searchTree({
        treeData,
        searchValue,
        selectedIndex: 0
      })

      setMatchesCount(nextMatchesCount)
      onChange(searchedTreeData)
    } else {
      const resetTreeData = resetTree(treeData)

      setMatchesCount(0)
      onChange(resetTreeData)
    }
  }

  const showNextSearchResult = () => {
    const searchValue = searchInputValue.trim()

    if (!(treeData && searchValue)) {
      return
    }

    const nextIndex = selectedIndex === matchesCount - 1 ? 0 : selectedIndex + 1
    const { searchedTreeData } = searchTree({
      treeData,
      searchValue,
      selectedIndex: nextIndex
    })

    setSelectedIndex(nextIndex)
    onChange(searchedTreeData)
  }

  const debouncedNewSearchTermHandler = useDebouncedCallback(
    handleNewSearchTerm,
    DEFAULT_INPUT_DEBOUNCE_DELAY
  )

  const handleSearchInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const newValue = event.target.value

    setSearchInputValue(newValue)
    debouncedNewSearchTermHandler()
    setSelectedIndex(0)
  }

  const handleSearchInputKeyDown = (event: SyntheticKeyboardEvent) => {
    if (event.key === 'Enter' && matchesCount) {
      showNextSearchResult()
    }
  }

  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const pageSearchHandler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.keyCode === F_KEY_CODE) {
        event.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', pageSearchHandler)

    return () => window.removeEventListener('keydown', pageSearchHandler)
  }, [])

  const searchInputEndAdornment = searchInputValue && matchesCount && (
    <Typography size='xsmall'>
      {selectedIndex + 1}/{matchesCount}
    </Typography>
  )

  return (
    <Input
      ref={searchInputRef}
      placeholder='Search employees'
      icon={<Search16 />}
      iconPosition='start'
      endAdornment={searchInputEndAdornment}
      value={searchInputValue}
      onChange={handleSearchInputChange}
      onKeyDown={handleSearchInputKeyDown}
    />
  )
}

export default StaffTreeSearchInput
