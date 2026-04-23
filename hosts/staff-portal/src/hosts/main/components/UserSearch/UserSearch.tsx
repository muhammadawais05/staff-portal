import { Search16, Page } from '@toptal/picasso'
import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete/types'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useState, MouseEvent, KeyboardEvent, useEffect } from 'react'
import { Link, useLocation, useNavigate } from '@staff-portal/navigation'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import { AutocompleteHighlightOptionWithPhoto } from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'
import {
  useGetUserSearchAutocomplete,
  UserSearchAutocompleteFragment
} from '@staff-portal/facilities'

import * as S from './styles'

export const USER_SEARCH_AUTOCOMPLETE_RESULTS_SIZE = 8

const renderSearchOption = ({
  item,
  onOpenLinkInSameTab
}: {
  item: Item
  onOpenLinkInSameTab: (selectedOptionName: string) => void
}) => {
  const { label, labelHighlight, nodeTypes, nodeTypeTitles, photo, node } =
    item as UserSearchAutocompleteFragment

  const optionUrl =
    node && 'webResource' in node && node.webResource.url
      ? node.webResource.url
      : '#'

  return (
    <Link
      href={optionUrl}
      noUnderline
      css={S.searchItemLink}
      data-testid='go-to-user-link'
      onClick={(event: MouseEvent) => {
        const isOpenedInSameTab = !event.ctrlKey && !event.metaKey

        if (isOpenedInSameTab) {
          onOpenLinkInSameTab(label || '')
        }
      }}
    >
      <AutocompleteHighlightOptionWithPhoto
        label={label}
        labelHighlight={labelHighlight}
        nodeTypes={nodeTypes}
        nodeTypeTitles={nodeTypeTitles}
        photo={photo?.thumb}
        status={node && 'status' in node ? node.status : undefined}
      />
    </Link>
  )
}

const getNodeKey = (item: Item) => (item as UserSearchAutocompleteFragment).key

const UserSearch = () => {
  const { showError } = useNotifications()
  const [isRedirectLoading, setIsRedirectLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => setIsRedirectLoading(false), [location])

  const {
    getUsers,
    data: users,
    loading: loadingUsers
  } = useGetUserSearchAutocomplete({
    onError: () => showError('An error occurred. Failed to load user list.')
  })

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: (term: string) => {
        getUsers({
          term,
          model: AutocompleteModels.QUICK_SEARCH,
          limit: USER_SEARCH_AUTOCOMPLETE_RESULTS_SIZE
        })
      },
      searchOptions: users,
      loadingOptions: loadingUsers
    })

  const loading = searching || isRedirectLoading

  const onOpenLinkInSameTab = (selectedOptionName: string) => {
    setSearchTerm(selectedOptionName)
    setIsRedirectLoading(true)
  }

  const handleOnChange = (
    searchQuery: string,
    { isSelected }: ChangedOptions
  ) => {
    setSearchTerm(searchQuery)

    if (!isSelected) {
      search(searchQuery)
    }
  }

  const handleOnSelect = (item: Item, event: MouseEvent | KeyboardEvent) => {
    if ('key' in event && event.key === 'Enter') {
      const { label, node } = item as UserSearchAutocompleteFragment

      if (node && 'webResource' in node && node.webResource.url) {
        onOpenLinkInSameTab(label as string)
        navigate(node.webResource.url)
      }
    }
  }

  return (
    <Page.Autocomplete
      maxLength={2048}
      icon={<Search16 />}
      loading={loading}
      enableReset={!loading}
      placeholder='Go to user'
      noOptionsText='No results'
      width='full'
      value={searchTerm}
      options={searchOptions}
      getKey={getNodeKey}
      renderOption={(item: Item) =>
        renderSearchOption({ item, onOpenLinkInSameTab })
      }
      onChange={handleOnChange}
      onSelect={handleOnSelect}
      testIds={{
        input: 'go-to-user'
      }}
    />
  )
}

export default UserSearch
