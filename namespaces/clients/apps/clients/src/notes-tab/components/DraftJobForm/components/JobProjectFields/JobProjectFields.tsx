import React, { useMemo } from 'react'
import { Form as PicassoForm, useField } from '@toptal/picasso-forms'
import { JobProjectType } from '@staff-portal/graphql/staff'
import { JOB_PROJECT_TYPE_MAPPING } from '@staff-portal/jobs'

import { JOB_PROJECT_TYPE_OPTIONS } from '../../config'
import { ProjectSpecCompletenessSurveyFragment } from '../../../DraftJobSection/data/project-spec-completeness-survey-fragment'
import { DraftJobFormFields } from '../../../../enums/DraftJobFormFields'
import RadioGroup from '../RadioGroup'
import Field from '../Field'

type Props = {
  projectSpecCompletenessSurvey: ProjectSpecCompletenessSurveyFragment
}

const DraftJobFormJobProjectFields = ({
  projectSpecCompletenessSurvey
}: Props) => {
  const selectedJobProjectType: JobProjectType | null = useField(
    DraftJobFormFields.ProjectType
  ).input.value

  const jobProjectTypeOptions = useMemo(
    () =>
      JOB_PROJECT_TYPE_OPTIONS.map(jobProjectType => ({
        text: JOB_PROJECT_TYPE_MAPPING[jobProjectType],
        value: jobProjectType
      })),
    []
  )

  return (
    <>
      <Field label='Type of Project'>
        <PicassoForm.Select
          name={DraftJobFormFields.ProjectType}
          placeholder='Type of Project'
          width='full'
          options={jobProjectTypeOptions}
        />
      </Field>

      {selectedJobProjectType === JobProjectType.NEW_IDEA_OR_PROJECT && (
        <Field label={projectSpecCompletenessSurvey.question}>
          <RadioGroup
            name={DraftJobFormFields.ProjectSpecCompleteness}
            options={projectSpecCompletenessSurvey.options}
          />
        </Field>
      )}
    </>
  )
}

export default DraftJobFormJobProjectFields
