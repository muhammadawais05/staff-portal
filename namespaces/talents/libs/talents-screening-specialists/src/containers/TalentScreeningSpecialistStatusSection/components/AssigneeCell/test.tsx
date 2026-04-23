import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouteType, RouteContext } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'

import { createStaffMock } from '../../data/mocks'
import AssigneeCell from './AssigneeCell'
import { ScreeningSpecialistFragment } from '../../../../data/screening-specialist-fragment.staff.gql.types'

const route: RouteType = path => ({ url: path })

const arrangeTest = (specialist?: ScreeningSpecialistFragment) =>
  render(
    <RouteContext.Provider value={route}>
      <TestWrapper>
        <AssigneeCell assignee={specialist} />
      </TestWrapper>
    </RouteContext.Provider>
  )

describe('AssigneeCell', () => {
  describe('when assignee is defined', () => {
    const specialist = createStaffMock()

    it('should show assigned specialist link', () => {
      arrangeTest(specialist)

      expect(screen.getByText(specialist.fullName)).toBeInTheDocument()
    })
  })

  describe('when assignee is not defined', () => {
    it('should show assigned specialist link', () => {
      arrangeTest()

      expect(screen.getByText('-')).toBeInTheDocument()
    })
  })
})
