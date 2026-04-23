import React, { ReactNode, useMemo } from 'react'
import { Container, PageHead } from '@toptal/picasso'

import * as S from './styles'

export interface Props {
  children: string | ReactNode
  actions?: ReactNode
  tabs?: ReactNode
  prependContent?: ReactNode
  titleTags?: ReactNode
}

const PageTitle = ({
  children,
  actions,
  tabs,
  prependContent,
  titleTags
}: Props) => {
  const hasTabs = useMemo(() => React.isValidElement(tabs), [tabs])

  return (
    <>
      <PageHead>
        <Container bottom={titleTags ? 'small' : undefined}>
          <PageHead.Main>
            <Container css={S.titleContainer} right='small'>
              {children}
            </Container>
            <PageHead.Actions>{actions}</PageHead.Actions>
          </PageHead.Main>
        </Container>

        {/* When page has tabs, we have to render `prependContent` between title and tabs inside `PageHead` */}
        {hasTabs && prependContent}

        <PageHead.Tabs>{tabs}</PageHead.Tabs>
      </PageHead>

      {/* When page hasn't tabs, we have to render `prependContent` under `PageHead`
      to display border between `PageHead` and `prependContent` */}
      {!hasTabs && prependContent}
    </>
  )
}

export default PageTitle
