import React from 'react'
import { Menu, Button } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { MenuLink } from '@staff-portal/ui'

import * as S from './styles'

export interface Props {
  searchCandidatesUrl?: Maybe<string>
  searchApplicantsUrl?: Maybe<string>
  searchRejectedTalentsUrl?: Maybe<string>
  disabled?: boolean
}

const SearchCandidatesButton = ({
  searchCandidatesUrl,
  searchApplicantsUrl,
  searchRejectedTalentsUrl,
  disabled
}: Props) => {
  if (!searchCandidatesUrl) {
    return null
  }

  return (
    <Button.Split
      variant='secondary'
      size='small'
      testIds={{ menuButton: 'search-candidates:menu-button' }}
      disabled={disabled}
      menu={
        <Menu>
          {searchApplicantsUrl && (
            <Menu.Item
              as={MenuLink}
              href={searchApplicantsUrl}
              target='_blank'
              data-testid='search-candidates:applicants-link'
              rel='noreferrer'
            >
              Screening
            </Menu.Item>
          )}
          {searchRejectedTalentsUrl && (
            <Menu.Item
              as={MenuLink}
              href={searchRejectedTalentsUrl}
              target='_blank'
              data-testid='search-candidates:rejected-talents-link'
              rel='noreferrer'
            >
              Rejected
            </Menu.Item>
          )}
        </Menu>
      }
    >
      <Link
        forwardedAs={Link}
        href={searchCandidatesUrl}
        target='_blank'
        noUnderline
        css={disabled ? S.disabledLink : S.link}
        data-testid='search-candidates:link'
      >
        Search Candidates
      </Link>
    </Button.Split>
  )
}

export default SearchCandidatesButton
