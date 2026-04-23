import React, { FC, memo, ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardItemWrapper } from '@staff-portal/ui'
import { Button, Container, Typography, Amount } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import { getMyPaymentsPath } from '@staff-portal/billing/src/utils/path'

import { GetDashboardCommissionWidgetQuery } from '../../data/getDashboardCommissionWidget.graphql.types'
import * as S from './styles'
import CommissionWidgetContentEmpty from '../CommissionWidgetContentEmpty'
import CommissionWidgetContentTable from '../CommissionWidgetContentTable'

const displayName = 'CommissionWidgetContent'

interface Props {
  data?: GetDashboardCommissionWidgetQuery
  gridSize?: ComponentProps<typeof DashboardItemWrapper>['gridSize']
}

export const CommissionWidgetContent: FC<Props> = memo<Props>(
  ({ data, gridSize }) => {
    const { t: translate } = useTranslation('commission')
    const commissions = data?.widgets?.commissions

    if (!commissions) {
      return null
    }

    const { totalAmount, months } = commissions
    const isEmpty = !months.length

    return (
      <DashboardItemWrapper
        hasPaddingTop={false}
        title={translate('dashboard.title') as string}
        gridSize={gridSize}
        data-testid='commission-widget-content'
        actions={
          !isEmpty && (
            <Button
              as={Link}
              data-testid={`${displayName}-payment`}
              href={getMyPaymentsPath()}
              size='small'
              // @ts-expect-error due to Link the variant not properly matched
              variant='secondary'
            >
              {translate('dashboard.action')}
            </Button>
          )
        }
        subtitle={
          <Container
            alignItems='center'
            css={S.subtitle}
            data-testid={`${displayName}-subtitle`}
            flex
            justifyContent='space-between'
          >
            <Typography size='inherit' weight='semibold'>
              {translate('dashboard.subtitle')}
            </Typography>
            <Amount
              amount={totalAmount}
              data-testid={`${displayName}-subtitle_amount`}
              size='large'
              weight='semibold'
            />
          </Container>
        }
      >
        {isEmpty ? (
          <CommissionWidgetContentEmpty />
        ) : (
          <CommissionWidgetContentTable months={months} />
        )}
      </DashboardItemWrapper>
    )
  }
)

CommissionWidgetContent.displayName = displayName

export default CommissionWidgetContent
