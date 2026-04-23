import React from 'react'
import { screen, render } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestWrapperWithMocks,
  assertOnTooltipText
} from '@staff-portal/test-utils'
import MockDate from 'mockdate'

import ResumeFilesField from './ResumeFilesField'
import {
  createGetTalentResumeFilesFailedMock,
  createGetTalentResumeFilesMock
} from './data/get-talent-resume-files/mocks'
import { TalentResumeFileFragment } from './data/get-talent-resume-files'

const TALENT_ID = 'VjEtQ29udHJhY3QtMjIwNTE4'

const arrangeTest = (talentId: string, mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ResumeFilesField talentId={talentId} />
    </TestWrapperWithMocks>
  )

describe('ResumeFilesField', () => {
  describe('when unable to fetch resume files', () => {
    it('shows an error message', async () => {
      arrangeTest(TALENT_ID, [
        createGetTalentResumeFilesFailedMock({ talentId: TALENT_ID })
      ])

      expect(
        await screen.findByText('Unable to get list of resume files.')
      ).toBeInTheDocument()
    })
  })

  describe('when the talent has resume files', () => {
    it('lists links to the files', async () => {
      MockDate.set('2022-01-22T03:55:00')
      const RESUME_FILE_WITH_UPLOADED_AT: TalentResumeFileFragment = {
        identifier: 'file 1',
        url: 'https://file-1.com',
        uploadedAt: '2021-01-18T20:51:50+03:00'
      }

      const RESUME_FILE_WITHOUT_UPLOADED_AT: TalentResumeFileFragment = {
        identifier: 'file 2',
        url: 'https://file-2.com',
        uploadedAt: null
      }

      arrangeTest(TALENT_ID, [
        createGetTalentResumeFilesMock({
          talentId: TALENT_ID,
          resumeFiles: [
            RESUME_FILE_WITH_UPLOADED_AT,
            RESUME_FILE_WITHOUT_UPLOADED_AT
          ]
        })
      ])

      const file1Link = await screen.findByText(
        '2021-01-18T20:51:50+03:00 - file 1'
      )

      expect(file1Link).toHaveAttribute(
        'href',
        RESUME_FILE_WITH_UPLOADED_AT.url
      )

      assertOnTooltipText(
        screen.getByTestId('resume-files-field-info-icon'),
        'Added on 2021-01-18T20:51:50+03:00 (about 1 year ago)'
      )

      const file2Link = await screen.findByText('file 2')

      expect(file2Link).toHaveAttribute(
        'href',
        RESUME_FILE_WITHOUT_UPLOADED_AT.url
      )
    })
  })

  describe('when the talent does not have resume files', () => {
    it('shows a dash', async () => {
      arrangeTest(TALENT_ID, [
        createGetTalentResumeFilesMock({ talentId: TALENT_ID })
      ])

      expect(await screen.findByText(NO_VALUE)).toBeInTheDocument()
    })
  })
})
