import React from 'react'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import CommentsField from './CommentsField'
import EngagementItemContent from '../EngagementItemContent'

const engagementId = 'engagementId'
const job = {
  webResource: 'webResource',
  jobType: 'jobType',
  vertical: {
    name: 'verticalName'
  }
}
const talent = {
  webResource: 'webResource'
}
const engagement = {
  id: engagementId,
  job,
  talent
}

const renderComponent = () => {
  return render(
    <Form
      onSubmit={() => {}}
      initialValues={{
        comments: [
          {
            engagementId,
            comment: ''
          }
        ]
      }}
      mutators={{ ...arrayMutators }}
    >
      <CommentsField
        engagements={
          { nodes: [engagement] } as unknown as NonNullable<
            SurveyEngagementFragment['engagements']
          >
        }
      />
    </Form>
  )
}

jest.mock('../EngagementItemContent')

const mockedEngagementItemContent = EngagementItemContent as jest.Mock

describe('CommentsField', () => {
  beforeEach(() => {
    mockedEngagementItemContent.mockReturnValue(null)
  })

  it('renders input and engagements as expected', () => {
    renderComponent()

    expect(mockedEngagementItemContent).toHaveBeenCalledWith(
      {
        jobLink: job.webResource,
        verticalName: job.vertical.name,
        prependContent: 'Comments for',
        talentLink: talent.webResource
      },
      {}
    )
    expect(
      screen.getByTestId('leave-feedback-modal-comment-field')
    ).toBeInTheDocument()
  })
})
