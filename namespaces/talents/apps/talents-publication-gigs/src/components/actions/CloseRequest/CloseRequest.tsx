import React from 'react'
import { Menu, Container, Typography } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@staff-portal/modals-service'

import CloseRequestModal from '../CloseRequestModal'

type Props = {
  gigId: string
}

const CloseRequest = ({ gigId }: Props) => {
  const { showModal } = useModal(CloseRequestModal, {
    onSubmit: () => {},
    gigId
  })

  const handleCloseRequest = () => {
    showModal()
  }

  return (
    <>
      <Menu.Item onClick={handleCloseRequest}>
        <Container
          data-testid='CloseButton'
          right='medium'
          flex
          alignItems='center'
        >
          <Typography size='medium'>Close Request</Typography>
        </Container>
      </Menu.Item>
    </>
  )
}

export default CloseRequest
