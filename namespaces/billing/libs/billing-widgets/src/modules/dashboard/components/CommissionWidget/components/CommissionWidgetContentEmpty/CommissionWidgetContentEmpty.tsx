import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Table, Container } from '@toptal/picasso'

const displayName = 'CommissionWidgetContentEmpty'

export const CommissionWidgetContentEmpty = () => {
  const { t: translate } = useTranslation('commission')

  return (
    <Table>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Container top='medium' bottom='medium'>
              <Typography size='inherit' data-testid={displayName}>
                {translate('dashboard.empty')}
              </Typography>
            </Container>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

CommissionWidgetContentEmpty.displayName = displayName

export default CommissionWidgetContentEmpty
