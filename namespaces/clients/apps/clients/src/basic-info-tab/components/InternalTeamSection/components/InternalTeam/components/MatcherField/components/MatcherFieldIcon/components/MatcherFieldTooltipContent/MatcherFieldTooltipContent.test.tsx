import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import MatcherFieldTooltipContent from '.'

describe('MatcherFieldTooltipContent', () => {
  describe('when client matcher is passed', () => {
    it('renders link', () => {
      const primaryRecruiterFullName = 'Érico Sabino'
      const temporaryRecruiterFullName = 'Janis Rutherford'

      render(
        <MatcherFieldTooltipContent
          primaryRecruiterFullName={primaryRecruiterFullName}
          temporaryRecruiterFullName={temporaryRecruiterFullName}
        />
      )

      expect(
        screen.getByTestId(
          'MatcherFieldTooltipContent-temporaryRecruiterFullNameprimaryRecruiterFullName'
        )
      ).toHaveTextContent(`Temporary Recruiter: ${temporaryRecruiterFullName}`)
      expect(
        screen.getByTestId(
          'MatcherFieldTooltipContent-primaryRecruiterFullName'
        )
      ).toHaveTextContent(
        `Primary Recruiter: ${primaryRecruiterFullName} (On vacation)`
      )
    })
  })
})
