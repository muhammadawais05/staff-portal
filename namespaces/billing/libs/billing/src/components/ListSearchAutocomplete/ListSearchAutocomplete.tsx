import React, { ReactNode, FC, memo, useCallback } from 'react'
import { SearchBar, SearchBarCategory } from '@staff-portal/filters'
import { useNotifications } from '@toptal/picasso/utils'
import { useTranslation } from 'react-i18next'

const displayName = 'ListSearchAutocomplete'

interface Props {
  nestableControls?: ReactNode
  searchBarCategories: SearchBarCategory[]
}

const ListSearchAutocomplete: FC<Props> = memo<Props>(
  ({ nestableControls, searchBarCategories }) => {
    const { showError } = useNotifications()
    const { t: translate } = useTranslation('common')
    const onError = useCallback(
      error => {
        showError(translate('error.searchError'))

        throw error
      },
      [showError, translate]
    )

    return (
      <SearchBar
        name='badges'
        categories={searchBarCategories}
        nestableControls={nestableControls}
        onError={onError}
        data-testid={displayName}
      />
    )
  }
)

ListSearchAutocomplete.displayName = displayName

export default ListSearchAutocomplete
