import React from 'react'
import { Grid, Slider, Typography } from '@toptal/picasso'

const MAX_HOURLY_RATE_AMOUNT = 500

interface Props {
  onFocus?: () => void
  onBlur?: () => void
  maxHourlyRate?: number
  onChange: (maxHourlyRate: number) => void
}

const JobMaxHourlyRateSlider = ({
  onFocus,
  onBlur,
  maxHourlyRate,
  onChange
}: Props) => {
  const [currentValue, setCurrentValue] = React.useState(maxHourlyRate)

  React.useEffect(() => {
    setCurrentValue(maxHourlyRate)
  }, [maxHourlyRate])

  return (
    <Grid
      justifyContent='center'
      alignItems='center'
      data-testid='job-max-hourly-rate-slider'
    >
      <Grid.Item>
        <Typography size='medium' weight='semibold'>
          $0
        </Typography>
      </Grid.Item>
      <Grid.Item small>
        <Slider
          onFocus={onFocus}
          onBlur={onBlur}
          tooltipFormat={value => <>${value}</>}
          tooltip={currentValue ? 'auto' : 'off'}
          value={currentValue ? Number(currentValue) : 0}
          onChange={(event, value) => {
            setCurrentValue(value ? Number(value) : 0)
            onChange(value ? Number(value) : 0)
          }}
          valueLabelDisplay='on'
          max={MAX_HOURLY_RATE_AMOUNT}
        />
      </Grid.Item>
      <Grid.Item>
        <Typography size='medium' weight='semibold'>
          ${MAX_HOURLY_RATE_AMOUNT}
        </Typography>
      </Grid.Item>
    </Grid>
  )
}

export default JobMaxHourlyRateSlider
