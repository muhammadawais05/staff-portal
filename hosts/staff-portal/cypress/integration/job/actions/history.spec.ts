import { updateJobHistoryStubs } from '~integration/mocks/schema-updates/job'
import { RecentActivityDrawer } from '~integration/modules/components'
import { JobPage } from '~integration/modules/pages/jobs'
import { ESCAPE_KEY } from '~integration/utils'

describe('Job Page -> History', () => {
  const page = new JobPage()
  const recentActivity = new RecentActivityDrawer()

  describe('when clicking the history button', () => {
    describe('when there are no activities', () => {
      it('shows empty message', () => {
        updateJobHistoryStubs()

        page.visit()

        page.actions.contains('History').click()

        recentActivity.drawer.contains('Recent Activity').should('exist')
        recentActivity.drawer.contains('No recent activity.').should('exist')

        recentActivity.drawer.trigger('keydown', { keyCode: ESCAPE_KEY })
      })
    })

    describe('when there are activities', () => {
      it('shows activities', () => {
        updateJobHistoryStubs([
          {
            id: '0005d216-775f-ba26-0000-0000051b12b3',
            occurredAt: '2021-12-01T17:26:57+03:00',
            action: 'posted',
            subjectGID: 'gid://platform/Job/271974',
            subjectName: null,
            performerGID: 'gid://platform/CompanyRepresentative/3023092',
            comment: null,
            payload:
              '{"empty_fields":"max_hourly_rate","complete_fields":"project_type,job_type,title,talent_count,commitment,estimated_length,start_date,has_preferred_hours,description,skills,project_spec_completeness,time_zone","complete_percentage":92}',
            template:
              '%{performer} %{action} %{subject.designation} %{subject}',
            __typename: 'Entry'
          }
        ])

        page.actions.contains('History').click()

        recentActivity.drawer.contains('Recent Activity').should('exist')
        recentActivity.drawer
          .contains(
            'Emmy Langworth (Fritsch, Greenholt and Wilderman) posted job Lead Digital Imaging Developer (271974)'
          )
          .should('exist')
      })
    })
  })
})
