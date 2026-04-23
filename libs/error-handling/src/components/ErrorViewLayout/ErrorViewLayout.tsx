import { Container, Typography, SizeType } from '@toptal/picasso'
import React, { ReactNode } from 'react'

interface Props {
  'data-testid'?: string
  icon: ReactNode
  header: string
  headerSize?: SizeType<'small' | 'medium' | 'large' | 'xlarge'> | 'inherit'
  subHeader?: string
  button?: ReactNode
}

const ErrorViewLayout = ({
  'data-testid': testId,
  icon,
  header,
  headerSize = 'xlarge',
  subHeader,
  button
}: Props) => {
  return <>
    <Container bottom='large' justifyContent='center' flex>
      {icon}
    </Container>
    <Container bottom='medium' data-testid={testId || 'ErrorViewLayout'}>
      <Typography variant='heading' size={headerSize} align='center'>
        {header}
      </Typography>
    </Container>

    {subHeader && (
      <Container bottom='medium'>
        <Typography size='medium' align='center' color='dark-grey'>
          {subHeader}
        </Typography>
      </Container>
    )}

    {button && (
      <Container justifyContent='center' flex>
        {button}
      </Container>
    )}
  </>
}

export default ErrorViewLayout
