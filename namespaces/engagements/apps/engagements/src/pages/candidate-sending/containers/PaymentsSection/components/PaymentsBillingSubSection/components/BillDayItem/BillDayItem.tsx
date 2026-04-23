import React, { useMemo } from 'react'
import { DetailedList as DL, WrapWithTooltip } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Container } from '@toptal/picasso'

import { getBillDayOptions } from '../../../../../../utils'
import { LabelRequiredPrefix } from '../../../../../../components'
import * as S from '../../../../../../styles'

type Props = {
  isMonthlyCycle?: boolean
  hasInitialValue?: boolean
}

const BillDayItem = ({ isMonthlyCycle, hasInitialValue = false }: Props) => {
  const billDayOptions = useMemo(() => getBillDayOptions(), [])

  if (isMonthlyCycle) {
    return null
  }

  return (
    <DL.Row css={S.centerItemAlign}>
      <DL.Item
        label={
          <>
            <LabelRequiredPrefix />
            {'Select the day to issue invoices'}
          </>
        }
      >
        <Container css={S.formFieldWidth}>
          <WrapWithTooltip
            enableTooltip={hasInitialValue}
            interactive={false}
            inline={false}
            content='This field contains a billing default. It can be edited after the engagement is created.'
          >
            <Form.Select
              name='billDay'
              options={billDayOptions}
              disabled={hasInitialValue}
              required
            />
          </WrapWithTooltip>
        </Container>
      </DL.Item>
    </DL.Row>
  )
}

export default BillDayItem
