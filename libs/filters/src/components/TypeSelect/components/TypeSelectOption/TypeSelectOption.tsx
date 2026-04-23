import React from 'react'
import { Container, Menu, Typography } from '@toptal/picasso'
import { CheckMinor16 } from '@toptal/picasso/Icon'
import DOMPurify from 'dompurify'
import { toTitleCase } from '@toptal/picasso/utils'

import { Option } from '../../types'
import { highlightSearchTerm } from '../../utils'
import * as S from './styles'

export type Props = {
  option: Option
  searchTerm?: string
  onSelect: (options: Option) => void
}

const TypeSelectOption = ({ option, onSelect, searchTerm = '' }: Props) => {
  const hasSubmenu = Boolean(option.children && option.children?.length > 1)

  const toggleSelect = () => {
    onSelect({
      ...option,
      selected: !option.selected,
      children: option.children?.map(item => ({
        ...item,
        selected: false
      }))
    })
  }

  const toggleChildSelect = (selectedChild: Option) => {
    onSelect({
      ...option,
      selected: false,
      children: option.children?.map(child => {
        if (child.id === selectedChild.id) {
          return {
            ...child,
            selected: !child.selected
          }
        }

        return child
      })
    })
  }

  return (
    <Container top='medium'>
      <Container
        data-testid='type-select-category-option'
        onClick={toggleSelect}
        css={S.container}
        flex
        justifyContent='flex-start'
      >
        <Container flex justifyContent='flex-start' css={S.checkIcon}>
          {option.selected && <CheckMinor16 />}
        </Container>
        <Container>
          <Typography
            size='small'
            variant='heading'
            weight='regular'
            dangerouslySetInnerHTML={{
              __html: highlightSearchTerm(
                DOMPurify.sanitize(toTitleCase(option.label) as string),
                searchTerm
              )
            }}
          />
        </Container>
      </Container>

      {hasSubmenu && (
        <Container top='small'>
          <Menu css={S.menu}>
            {option.children?.map(child => (
              <Menu.Item
                key={child.id}
                data-testid='type-select-subcategory-option'
                checkmarked={!option.selected && child.selected}
                onClick={() => toggleChildSelect(child)}
              >
                <Typography
                  color='black'
                  size='medium'
                  dangerouslySetInnerHTML={{
                    __html: highlightSearchTerm(
                      DOMPurify.sanitize(toTitleCase(child.label) as string),
                      searchTerm
                    )
                  }}
                />
              </Menu.Item>
            ))}
          </Menu>
        </Container>
      )}
    </Container>
  )
}

export default TypeSelectOption
