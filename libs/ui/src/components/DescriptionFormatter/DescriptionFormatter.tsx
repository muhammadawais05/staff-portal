import { Container, Typography, SpacingType } from '@toptal/picasso'
import React, { memo } from 'react'

import MakeLinksInteractive from '../MakeLinksInteractive'
import { splitTextInParagraphs } from './utils/split-text-in-paragraphs'
import * as S from './styles'

export interface Props {
  text: string
  blockSpacing?: SpacingType
}

const DescriptionFormatter = ({ text, blockSpacing = 'xsmall' }: Props) => {
  return (
    <>
      {splitTextInParagraphs(text).map((block, blockIndex) => (
        <Container
          // Seems to be to be non unique text rendering
          // eslint-disable-next-line react/no-array-index-key
          key={blockIndex}
          top={blockIndex === 0 ? undefined : blockSpacing}
        >
          {block.map((paragraph, index) => (
            <Typography
              // Seems to be to be non unique text rendering
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              size='inherit'
              color='inherit'
              weight='inherit'
              css={S.descriptionParagraph}
            >
              <MakeLinksInteractive>{paragraph}</MakeLinksInteractive>
            </Typography>
          ))}
        </Container>
      ))}
    </>
  )
}

export default memo(DescriptionFormatter)
