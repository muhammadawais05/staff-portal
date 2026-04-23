/* eslint-disable complexity */
import React from 'react'
import { Grid, NumberInput, NumberInputProps } from '@toptal/picasso'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { MAX_INT_LENGTH } from '@staff-portal/config'

import {
  cleanNumberValueWithLimit,
  formattedCleanNumberValueWithLimit,
  makeHandler
} from './utils'
import * as S from './styles'

export interface AmountRange {
  from?: number | string
  to?: number | string
}

export enum FieldName {
  FROM = 'from',
  TO = 'to'
}

export type AmountRangeHandler = (value: AmountRange) => void
export type AmountRangeKeyDownHandler = (
  event: React.KeyboardEvent<HTMLInputElement>,
  value: AmountRange
) => void

export type Props = Pick<NumberInputProps, 'min' | 'max'> & {
  name: string
  value?: AmountRange
  hasError?: boolean
  onChange: AmountRangeHandler
  onBlur?: AmountRangeHandler
  onReset?: AmountRangeHandler
  onKeyDown?: AmountRangeKeyDownHandler
  maxLength?: number
}

const AmountRangeInput = ({
  name,
  min,
  max,
  maxLength = MAX_INT_LENGTH,
  value = { from: '', to: '' },
  hasError = false,
  onBlur,
  onChange,
  onReset,
  onKeyDown
}: Props) => {
  const enableReset = Boolean(onReset)
  const { from, to } = value
  const valueValidationFailed = Boolean(to && Number(from) > Number(to))

  return (
    <>
      <Grid spacing={16} css={S.filtersAmountGrid}>
        <Grid.Item small={6}>
          <NumberInput
            min={min}
            max={to}
            value={from}
            name={`${name}.${FieldName.FROM}`}
            data-testid={`${name}.${FieldName.FROM}`}
            enableReset={enableReset}
            onResetClick={
              makeHandler(FieldName.FROM, onReset, value) as () => void
            }
            onBlur={makeHandler(
              FieldName.FROM,
              onBlur,
              value,
              formattedCleanNumberValueWithLimit(maxLength)
            )}
            onChange={makeHandler(
              FieldName.FROM,
              onChange,
              value,
              cleanNumberValueWithLimit(maxLength)
            )}
            onKeyDown={ev => onKeyDown && onKeyDown(ev, value)}
            error={hasError || valueValidationFailed}
            icon={<ReferralBonus16 />}
            width='full'
            // https://toptal-core.atlassian.net/browse/SPB-1501?focusedCommentId=70699
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            type='text'
            hideControls
          />
        </Grid.Item>
        <Grid.Item small={6}>
          <NumberInput
            min={from}
            max={max}
            value={to}
            maxLength={maxLength}
            name={`${name}.${FieldName.TO}`}
            data-testid={`${name}.${FieldName.TO}`}
            enableReset={enableReset}
            onResetClick={
              makeHandler(FieldName.TO, onReset, value) as () => void
            }
            onBlur={makeHandler(
              FieldName.TO,
              onBlur,
              value,
              formattedCleanNumberValueWithLimit(maxLength)
            )}
            onChange={makeHandler(
              FieldName.TO,
              onChange,
              value,
              cleanNumberValueWithLimit(maxLength)
            )}
            onKeyDown={ev => onKeyDown && onKeyDown(ev, value)}
            error={hasError || valueValidationFailed}
            icon={<ReferralBonus16 />}
            width='full'
            // https://toptal-core.atlassian.net/browse/SPB-1501?focusedCommentId=70699
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            type='text'
            hideControls
          />
        </Grid.Item>
      </Grid>
    </>
  )
}

export default AmountRangeInput
