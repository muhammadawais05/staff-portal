import { findByTestId, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'
import { SliderProps } from '@toptal/picasso'

import JobMaxHourlyRateSlider from './JobMaxHourlyRateSlider'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Slider: (props: SliderProps) => {
    const { id, name, min, max, onChange, value } = props

    return (
      <input
        type='range'
        id={id}
        name={name}
        min={min}
        max={max}
        value={`${value}`}
        onChange={event =>
          onChange?.(event, parseInt(event.target.value) as number)
        }
      />
    )
  }
}))

describe('JobMaxHourlyRateSlider', () => {
  it('displays the value of max hourly rate', async () => {
    const { container } = render(
      <TestWrapper>
        <Form onSubmit={() => {}}>
          <JobMaxHourlyRateSlider maxHourlyRate={450} onChange={() => {}} />
        </Form>
      </TestWrapper>
    )

    expect(
      (
        await findByTestId(container, 'job-max-hourly-rate-slider')
      ).querySelector('input')!.value
    ).toBe('450')

    fireEvent.change(container.querySelector('input')!, {
      target: { value: '420' }
    })

    expect((container.querySelector('input') as HTMLInputElement).value).toBe(
      '420'
    )
  })

  it('changes max hourly rate', async () => {
    const { container } = render(
      <TestWrapper>
        <Form onSubmit={() => {}}>
          <JobMaxHourlyRateSlider maxHourlyRate={450} onChange={() => {}} />
        </Form>
      </TestWrapper>
    )

    fireEvent.change(
      (
        await findByTestId(container, 'job-max-hourly-rate-slider')
      ).querySelector('input')!,
      {
        target: { value: '100' }
      }
    )

    expect((container.querySelector(`input`) as HTMLInputElement).value).toBe(
      '100'
    )
  })

  it('displays min and max values', () => {
    const { container } = render(
      <TestWrapper>
        <Form onSubmit={() => {}}>
          <JobMaxHourlyRateSlider maxHourlyRate={0} onChange={() => {}} />
        </Form>
      </TestWrapper>
    )

    expect(container).toHaveTextContent('$0')
    expect(container).toHaveTextContent('$500')
  })
})
