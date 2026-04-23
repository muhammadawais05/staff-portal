import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Container, Input, Search16 } from '@toptal/picasso'
import { useDebouncedCallback } from 'use-debounce'

interface Props {
  initialValue?: string
  onChange: React.Dispatch<
    React.SetStateAction<{
      page: number
      nameSearch: string
    }>
  >
  placeholder?: string
}

const CommunityLeadersSearchField = ({
  initialValue = '',
  placeholder = '',
  onChange
}: Props) => {
  const [value, setValue] = useState(initialValue)

  const debouncedOnChange = useDebouncedCallback(
    (val: string) => onChange({ page: 0, nameSearch: val }),
    500
  )

  const handleFilterChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setValue(event.currentTarget.value)
      debouncedOnChange(event.currentTarget.value)
    },
    [setValue, debouncedOnChange]
  )

  useEffect(() => debouncedOnChange.cancel, [debouncedOnChange])

  return (
    <Container top='medium' bottom='medium' flex>
      <Input
        data-testid='community-leader-search-form'
        icon={<Search16 />}
        placeholder={placeholder}
        value={value}
        onChange={handleFilterChange}
        width='full'
      />
    </Container>
  )
}

export default CommunityLeadersSearchField
