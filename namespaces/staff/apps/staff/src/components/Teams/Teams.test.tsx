import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Teams from './Teams'

const renderComponent = (props: ComponentProps<typeof Teams>) =>
  render(
    <TestWrapper>
      <Teams {...props} />
    </TestWrapper>
  )

describe('Teams', () => {
  describe('when staff id is equal to the team manager id', () => {
    it('renders team with (Leader) addition', () => {
      const staffId = 'staffId'
      const teamName = 'Project Manager Screeners'
      const teams = {
        nodes: [
          {
            id: 'id',
            name: teamName,
            manager: {
              role: {
                id: staffId
              }
            }
          }
        ]
      }

      renderComponent({
        teams,
        staffId
      })

      expect(screen.getByTestId('staff-teams').innerHTML).toBe(
        `${teamName} (Leader)`
      )
    })
  })

  describe('when staff id is not equal to the team manager id', () => {
    it('renders team without (Leader) addition', () => {
      const staffId = 'staffId'
      const teamName = 'Project Manager Screeners'
      const teams = {
        nodes: [
          {
            id: 'id',
            name: teamName,
            manager: {
              role: {
                id: 'id'
              }
            }
          }
        ]
      }

      renderComponent({
        teams,
        staffId
      })

      expect(screen.getByTestId('staff-teams').innerHTML).toBe(teamName)
    })
  })

  describe('when passed multiple teams', () => {
    it('render teams in the alphabetical sequence', () => {
      const staffId = 'staffId'
      const teamName1 = 'Project Manager Screeners'
      const teamName2 = 'A Real Best Manager'

      const teams = {
        nodes: [
          {
            id: 'id',
            name: teamName1,
            manager: {
              role: {
                id: 'id'
              }
            }
          },
          {
            id: 'id2',
            name: teamName2,
            manager: {
              role: {
                id: 'id'
              }
            }
          }
        ]
      }

      renderComponent({
        teams,
        staffId
      })

      expect(screen.getByTestId('staff-teams').innerHTML).toBe(
        `${teamName2}, ${teamName1}`
      )
    })
  })
})
