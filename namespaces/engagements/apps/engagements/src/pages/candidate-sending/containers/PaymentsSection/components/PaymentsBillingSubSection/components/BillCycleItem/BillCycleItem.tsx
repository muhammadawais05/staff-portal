import React, { useMemo } from 'react'
import { DetailedList as DL, WrapWithTooltip } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Container } from '@toptal/picasso'
import { getBillCycleOptions } from '@staff-portal/billing'

import { LabelRequiredPrefix } from '../../../../../../components'
import * as S from '../../../../../../styles'

type Props = {
  hasInitialValue?: boolean
}

const BillCycleItem = ({ hasInitialValue = false }: Props) => {
  const billCycleOptions = useMemo(() => getBillCycleOptions(), [])

  return (
    <DL.Row>
      <DL.Item
        label={
          <>
            <LabelRequiredPrefix />
            {'How often invoices should be issued?'}
          </>
        }
        multilines
      >
        <Container css={S.formFieldWidth}>
          <WrapWithTooltip
            enableTooltip={hasInitialValue}
            interactive={false}
            inline={false}
            content='This field contains a billing default. It can be edited after the engagement is created.'
          >
            <Form.Select
              name='billCycle'
              options={billCycleOptions}
              disabled={hasInitialValue}
              required
            />
          </WrapWithTooltip>
        </Container>
      </DL.Item>
    </DL.Row>
  )
}

export default BillCycleItem
