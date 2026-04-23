import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { MultilineTextViewer } from '@staff-portal/ui'

export const CLIENTOPEDIA_TITLE = 'Clientopedia'
export const BSS_TITLE = 'External source'

type Props = {
  internalAbout: string | null | undefined
  bssAbout: string | null | undefined
  clientopediaDescription: string | null | undefined
}

const AboutViewer = ({
  internalAbout,
  bssAbout,
  clientopediaDescription
}: Props) => {
  return (
    <Container>
      {bssAbout && (
        <Container top={internalAbout ? 'small' : undefined}>
          <Container>
            <Typography variant='heading' size='medium'>
              {BSS_TITLE}
            </Typography>
          </Container>
          <MultilineTextViewer
            value={bssAbout}
            data-testid='AboutViewer-bss-text'
          />
        </Container>
      )}

      {clientopediaDescription && (
        <Container top={clientopediaDescription ? 'small' : undefined}>
          <Container>
            <Typography variant='heading' size='medium'>
              {CLIENTOPEDIA_TITLE}
            </Typography>
          </Container>
          <MultilineTextViewer
            value={clientopediaDescription}
            data-testid='AboutViewer-clientopedia-text'
          />
        </Container>
      )}
    </Container>
  )
}

export default AboutViewer
