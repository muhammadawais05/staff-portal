import { noop } from '@staff-portal/utils'
import { Form } from '@toptal/picasso-forms'
import React from 'react'

import { LineChartFilters } from '../../types'
import LineChartSectionBody, { LineChartProps } from '../LineChartSectionBody'

interface Props extends LineChartProps {
  initialFilters: LineChartFilters
}

const LineChartSection = ({
  title,
  chartPath,
  initialFilters,
  TopRightContent,
  BottomContent,
  onChange
}: Props) => {
  return (
    <Form<LineChartFilters> initialValues={initialFilters} onSubmit={noop}>
      <LineChartSectionBody
        title={title}
        chartPath={chartPath}
        onChange={onChange}
        TopRightContent={TopRightContent}
        BottomContent={BottomContent}
      />
    </Form>
  )
}

export default LineChartSection
