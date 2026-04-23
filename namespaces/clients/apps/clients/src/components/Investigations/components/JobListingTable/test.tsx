import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import { render, screen, act, fireEvent } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import JobListingTable from '.'
import { investigationsDataMock } from '../../data/get-investigations.mock'

jest.mock('./components/Claimer')
jest.mock('./components/Talent')
jest.mock('./components/Job')
jest.mock('@staff-portal/jobs/src/components/JobStatus')

const formSubmitMock = jest.fn()

const arrangeTest = (props: ComponentProps<typeof JobListingTable>) =>
  render(
    <TestWrapper>
      <div data-testid='form-wrapper'>
        <Form onSubmit={formSubmitMock}>
          <JobListingTable {...props} />
        </Form>
      </div>
    </TestWrapper>
  )

const job = investigationsDataMock.investigations.nodes[0].jobs.nodes[0]

describe('JobListingTable', () => {
  it('default render', () => {
    arrangeTest({ jobs: [job] })

    expect(screen.getByTestId('JobListingTable-header-job').textContent).toBe(
      'Job'
    )
    expect(
      screen.getByTestId('JobListingTable-header-talent').textContent
    ).toBe('Talent')
    expect(
      screen.getByTestId('JobListingTable-header-claimer').textContent
    ).toBe('Claimer')
    expect(
      screen.getByTestId('JobListingTable-header-status').textContent
    ).toBe('Status')

    expect(screen.getByTestId('Job-title').textContent).toBe(job.title)
    expect(screen.getByTestId('Job-webResource').textContent).toBe(
      JSON.stringify(job.webResource)
    )

    expect(screen.getByTestId('Talent-talents').textContent).toBe(
      JSON.stringify(job.currentTalents.nodes)
    )
    expect(screen.getByTestId('Talent-talentsCount').textContent).toBe(
      job.currentTalents.totalCount.toString()
    )

    expect(screen.getByTestId('Claimer-claimer').textContent).toBe(
      JSON.stringify(job.claimer)
    )

    expect(screen.getByTestId('JobStatus-job').textContent).toBe(
      JSON.stringify(job)
    )

    expect(screen.getByTestId('JobStatus-tooltipContent').textContent).toBe(
      'default tooltip content'
    )

    expect(screen.getByTestId('JobStatus-showTooltip').textContent).toBe('true')

    expect(
      screen.getByTestId('JobStatus-ignoreInvestigationStatus').textContent
    ).toBe('false')

    expect(
      screen.queryByTestId('JobListingTable-checkbox-header')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId(`JobListingTable-select-job-${job.id}`)
    ).not.toBeInTheDocument()
  })

  it('displays checkboxes for selecting jobs when `selectable` is true', async () => {
    arrangeTest({ jobs: [job], selectable: true })

    expect(
      screen.queryByTestId('JobListingTable-checkbox-header')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId(`JobListingTable-select-job-${job.id}`)
    ).toBeInTheDocument()

    const form = screen
      .getByTestId('form-wrapper')
      .querySelector('form') as Element
    const checkAllCheckbox = screen
      .getByTestId('JobListingTable-checkbox-header-checkbox-all')
      .querySelector('input') as Element

    fireEvent.click(checkAllCheckbox)

    expect(
      screen
        .getByTestId(`JobListingTable-select-job-${job.id}`)
        .querySelector('input')
    ).toBeChecked()

    fireEvent.submit(form)

    await act(async () => {
      expect(formSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          jobIds: ['VjEtUmV2aWV3QXR0ZW1wdC02MDM3OQ']
        }),
        expect.anything(),
        expect.anything()
      )
    })

    fireEvent.click(checkAllCheckbox)

    expect(
      screen
        .getByTestId(`JobListingTable-select-job-${job.id}`)
        .querySelector('input')
    ).not.toBeChecked()

    fireEvent.submit(form)

    await act(async () => {
      expect(formSubmitMock).toHaveBeenCalledWith(
        expect.objectContaining({
          jobIds: []
        }),
        expect.anything(),
        expect.anything()
      )
    })
  })

  it('does not show jobs status tooltips when showStatusTooltips equals false', () => {
    arrangeTest({
      jobs: [job],
      showStatusTooltips: false
    })

    expect(screen.getByTestId('JobStatus-showTooltip').textContent).toBe(
      'false'
    )
  })

  it('ignores investigation status when ignoreInvestigationStatus equals true', () => {
    arrangeTest({
      jobs: [job],
      ignoreInvestigationStatus: true
    })

    expect(
      screen.getByTestId('JobStatus-ignoreInvestigationStatus').textContent
    ).toBe('true')
  })
})
