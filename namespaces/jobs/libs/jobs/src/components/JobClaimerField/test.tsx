import React from 'react'
import { render, screen } from '@testing-library/react'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import JobClaimerField from './'

describe('JobClaimerField', () => {
  const claimerName = 'Claimer Name'
  const claimerUrl = '/claimer-url'

  const claimerReplacementName = 'Claimer Replacement Name'
  const claimerReplacementUrl = '/claimer-replacement-url'

  const jobClaimerFieldLink = 'JobClaimerField-link'
  const jobClaimerFieldTooltipIcon = 'JobClaimerField-tooltip-icon'

  describe('When job claimer is not provided', () => {
    it('renders `NO_VALUE`', () => {
      render(
        <TestWrapper>
          <JobClaimerField claimer={null} />
        </TestWrapper>
      )

      expect(screen.queryByTestId(jobClaimerFieldLink)).not.toBeInTheDocument()
      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
      expect(
        screen.queryByTestId(jobClaimerFieldTooltipIcon)
      ).not.toBeInTheDocument()
    })
  })

  describe('When job claimer is provided', () => {
    it('renders claimer link when claimer url is provided', () => {
      render(
        <TestWrapper>
          <JobClaimerField
            claimer={{ webResource: { url: claimerUrl, text: claimerName } }}
          />
        </TestWrapper>
      )

      expect(screen.queryByTestId(jobClaimerFieldLink)).toHaveAttribute(
        'href',
        claimerUrl
      )
      expect(
        screen.queryByTestId(jobClaimerFieldTooltipIcon)
      ).not.toBeInTheDocument()
    })

    it('renders claimer name when no url is provided', () => {
      render(
        <TestWrapper>
          <JobClaimerField claimer={{ webResource: { text: claimerName } }} />
        </TestWrapper>
      )

      const claimerText = screen.getByText(claimerName)

      expect(screen.queryByTestId(jobClaimerFieldLink)).not.toBeInTheDocument()
      expect(claimerText).toBeInTheDocument()
      expect(
        screen.queryByTestId(jobClaimerFieldTooltipIcon)
      ).not.toBeInTheDocument()
    })
  })

  describe('When job claimer replacement is provided', () => {
    it('renders claimer replacement link with the tooltip when url is provided', () => {
      render(
        <TestWrapper>
          <JobClaimerField
            claimer={{ webResource: { url: claimerUrl, text: claimerName } }}
            claimerReplacement={{
              webResource: {
                url: claimerReplacementUrl,
                text: claimerReplacementName
              }
            }}
          />
        </TestWrapper>
      )

      expect(screen.queryByTestId(jobClaimerFieldLink)).toHaveAttribute(
        'href',
        claimerReplacementUrl
      )
      expect(screen.queryByText(claimerName)).not.toBeInTheDocument()
      assertOnTooltip(
        screen.getByTestId(jobClaimerFieldTooltipIcon),
        tooltip => {
          expect(tooltip).toHaveTextContent(
            `Temporary Recruiter: ${claimerReplacementName}`
          )
          expect(tooltip).toHaveTextContent(
            `Primary Recruiter: ${claimerName} (On vacation)`
          )
        }
      )
    })

    it('renders claimer replacement name with the tooltip when no url is provided', () => {
      render(
        <TestWrapper>
          <JobClaimerField
            claimer={{ webResource: { url: claimerUrl, text: claimerName } }}
            claimerReplacement={{
              webResource: {
                text: claimerReplacementName
              }
            }}
          />
        </TestWrapper>
      )

      const claimerReplacementText = screen.getByText(claimerReplacementName)

      expect(screen.queryByTestId(jobClaimerFieldLink)).not.toBeInTheDocument()
      expect(claimerReplacementText).toBeInTheDocument()
      expect(screen.queryByText(claimerName)).not.toBeInTheDocument()
      assertOnTooltip(
        screen.getByTestId(jobClaimerFieldTooltipIcon),
        tooltip => {
          expect(tooltip).toHaveTextContent(
            `Temporary Recruiter: ${claimerReplacementName}`
          )
          expect(tooltip).toHaveTextContent(
            `Primary Recruiter: ${claimerName} (On vacation)`
          )
        }
      )
    })
  })
})
