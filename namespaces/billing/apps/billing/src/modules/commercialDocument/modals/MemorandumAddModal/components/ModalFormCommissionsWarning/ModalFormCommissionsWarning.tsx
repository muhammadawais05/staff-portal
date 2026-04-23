import React, { FC, memo } from 'react'
import { Container, Helpbox } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'

const displayName = 'ModalFormCommissionsWarning'

const ModalFormCommissionsWarning: FC = memo(() => {
  const { t: translate } = useTranslation('memorandum')

  return (
    <Container top={1} data-testid={displayName}>
      <Helpbox variant='red'>
        <Helpbox.Content
          data-testid={`${displayName}-affects-commissions-warning`}
        >
          {translate('addModal.warning.affectsCommissionsWarning')}
        </Helpbox.Content>
      </Helpbox>
    </Container>
  )
})

ModalFormCommissionsWarning.displayName = displayName

export default ModalFormCommissionsWarning
