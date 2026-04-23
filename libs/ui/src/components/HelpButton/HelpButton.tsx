import {
  Button,
  CloseMinor16,
  Container,
  QuestionMark16,
  Tooltip,
  Typography
} from '@toptal/picasso'
import React, { ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'

import * as S from './styles'

interface HelpTooltipContentProps {
  title: string
  children: ReactNode
  onClose: () => void
}

const HelpTooltipContent = ({
  title,
  children,
  onClose
}: HelpTooltipContentProps) => {
  return (
    <Container>
      <Container
        flex
        alignItems='center'
        justifyContent='space-between'
        bottom='xsmall'
      >
        <Typography weight='semibold' size='medium'>
          {title}
        </Typography>

        <Container left='small'>
          <Button.Circular
            variant='flat'
            icon={<CloseMinor16 />}
            data-testid='close-button'
            onClick={onClose}
          />
        </Container>
      </Container>

      <Container css={S.tooltipContent}>{children}</Container>
    </Container>
  )
}

export interface Props {
  title: string
  content: ReactNode
  showBtnText?: boolean
  isOpenByDefault?: boolean
}

const HelpButton = ({
  title,
  content,
  showBtnText,
  isOpenByDefault
}: Props) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault)

  const icon = isOpen ? (
    <CloseMinor16 data-testid='close-help-icon' />
  ) : (
    <QuestionMark16 />
  )
  const toggleTooltip = () => setIsOpen(!isOpen)
  const target = document.getElementById('help-button-portal')

  const portalContent = (
    <Container css={S.helpWrapper}>
      <Tooltip
        disablePortal
        placement='bottom-end'
        open={isOpen}
        content={
          <HelpTooltipContent onClose={toggleTooltip} title={title}>
            {content}
          </HelpTooltipContent>
        }
      >
        {showBtnText ? (
          <Button
            icon={icon}
            size='small'
            iconPosition='right'
            variant='secondary'
            data-testid='help-button'
            onClick={toggleTooltip}
          >
            {title}
          </Button>
        ) : (
          <Button.Circular
            icon={icon}
            data-testid='help-button'
            onClick={toggleTooltip}
          />
        )}
      </Tooltip>
    </Container>
  )

  return target ? createPortal(portalContent, target) : null
}

export default HelpButton
