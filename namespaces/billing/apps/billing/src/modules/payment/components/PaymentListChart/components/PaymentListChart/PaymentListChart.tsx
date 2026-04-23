import React, { FC, memo } from 'react'
import { Section, Container, Tooltip, SkeletonLoader } from '@toptal/picasso'
import { LineChart } from '@staff-portal/charts'
import { QuestionMark16 as Icon } from '@toptal/picasso/Icon'
import { useTranslation } from 'react-i18next'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'

import { iconWrapper } from './styles'
import PaymentListChartTooltip from '../PaymentListChartTooltip'
import { ConvertedResult } from '../../utils/convertValuesToData'
import {
  convertValuesToData,
  convertHighlights,
  getLineConfigByValues,
  generateReferenceLines
} from '../../utils'
import { usePaymentsChart } from '../../data'

interface Props {
  loading?: boolean
}

const displayName = 'PaymentListChart'

/**
 * @deprecated: remove when https://toptal-core.atlassian.net/browse/SPT-1067 will be fixed
 */
export const filterChartData = (data: ConvertedResult) => {
  return data.map(({ x: xValue, not_received, paid_early }) => ({
    x: xValue,
    not_received,
    paid_early
  }))
}

const PaymentListChart: FC<Props> = memo<Props>(
  ({ loading: forcedLoading }) => {
    const { t: translate } = useTranslation('payment')
    const { data: results, initialLoading } = usePaymentsChart({
      kpi: 'financials_early_payments'
    })

    if (!initialLoading && !results) {
      return null
    }

    const {
      data: values,
      highlights: rawHighlights,
      thresholds_dates: thresholds,
      description
    } = results || {
      data: [],
      highlights: [],
      thresholds_dates: {},
      description: ''
    }

    if (!values) {
      return null
    }

    const loading = forcedLoading || initialLoading
    const timezoneLabel = results?.timezone_label
    const referenceLines = generateReferenceLines(thresholds)
    const highlights = convertHighlights(values, rawHighlights)
    const lineConfig = getLineConfigByValues(values)
    const data = convertValuesToData(values)

    // TODO : remove this workaround with `date` removal,
    //  when https://toptal-core.atlassian.net/browse/SPT-1067 will be fixed,
    //  and use `data` straight ahead without filtering
    const chartLinesData = filterChartData(data)

    return (
      <Section
        data-testid={displayName}
        title={translate('chart.subtitle')}
        subtitle={
          <Tooltip content={description} placement='bottom' interactive>
            <Container inline css={iconWrapper}>
              <Icon />
            </Container>
          </Tooltip>
        }
      >
        <ContentLoader
          loading={false}
          showSkeleton={loading}
          skeletonComponent={
            <Container bottom={0.5}>
              <SkeletonLoader.Typography rows={8} />
            </Container>
          }
        >
          <LineChart
            tooltip
            unit='%'
            data={chartLinesData}
            referenceLines={referenceLines}
            highlights={highlights}
            lineConfig={lineConfig}
            customTooltip={
              <PaymentListChartTooltip
                data={data}
                baseTimezone={timezoneLabel}
              />
            }
          />
        </ContentLoader>
      </Section>
    )
  }
)

PaymentListChart.displayName = displayName

export default PaymentListChart
