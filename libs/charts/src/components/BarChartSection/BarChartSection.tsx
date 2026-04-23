import { Form } from '@toptal/picasso-forms'
import React from 'react'

import { BarChartFilters } from '../../types'
import ChartSectionBody, { BarChartProps } from '../ChartSectionBody'

interface Props extends BarChartProps {
  initialFilters: BarChartFilters
}

const BarChartSection = ({
  title,
  chartPath,
  initialFilters,
  TopRightContent,
  BottomContent,
  onChange
}: Props) => (
  <Form<BarChartFilters> initialValues={initialFilters} onSubmit={() => {}}>
    <ChartSectionBody
      title={title}
      chartPath={chartPath}
      onChange={onChange}
      TopRightContent={TopRightContent}
      BottomContent={BottomContent}
    />
  </Form>
)

export default BarChartSection
