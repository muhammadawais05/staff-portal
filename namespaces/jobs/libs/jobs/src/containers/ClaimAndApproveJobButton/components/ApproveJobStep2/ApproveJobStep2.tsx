import React, { PropsWithChildren, useMemo } from 'react'
import { Button, Container, Modal, Typography } from '@toptal/picasso'
import { Form, useFieldArray, useField } from '@toptal/picasso-forms'
import { palette } from '@toptal/picasso/utils'
import { CenteredLoader } from '@staff-portal/ui'

import { JobSkillSet } from '../../../../types'
import { ApproveJobForm, JobDetails } from '../../types'
import ApproveJobSubtitle from '../ApproveJobSubtitle'
import { JobRecommendedSkills } from './components'
import { useGetRecommendedSkills, useGetCoreSkills } from './data'
import * as S from './styles'
import AsteriskIcon from '../../../../components/AsteriskIcon'
import {
  RequiredSkillsAutocomplete,
  MainSkillSelect
} from '../../../../components'
import useHandleChangeSkills from '../../../../hooks/use-handle-change-skills'
import SkillList from '../../../../components/SkillList'

export interface Props {
  onClose: () => void
  job: JobDetails
  navigateToStep1: () => void
}

const ApproveJobStep2 = ({
  job: { id: jobId, title, skillSets: jobSkillSets, defaultSkillCategory },
  onClose,
  navigateToStep1,
  children
}: PropsWithChildren<Props>) => {
  const initialSkillSets = useMemo<JobSkillSet[]>(
    () =>
      jobSkillSets?.nodes.map(skillSet => ({
        ...skillSet,
        destroy: false,
        // eslint-disable-next-line @miovision/disallow-date/no-new-date
        addedAt: new Date().toISOString()
      })) || [],
    [jobSkillSets]
  )

  const {
    fields: { value: skillSets, push, remove }
  } = useFieldArray<JobSkillSet>('skills', { initialValue: initialSkillSets })
  const {
    input: { value: mainSkillBadFit }
  } = useField<ApproveJobForm['mainSkillBadFit']>('mainSkillBadFit')

  const { coreSkills, loading: getCoreSkillsLoading } = useGetCoreSkills(jobId)
  const { recommendedSkills, loading: recommendedSkillsLoading } =
    useGetRecommendedSkills({
      jobId,
      skillSets
    })

  const {
    onSkillSelect,
    handleMainSkillChange,
    handleSkillRatingChange,
    deleteSkill,
    handleSkillRequiredChange
  } = useHandleChangeSkills({
    fieldValues: skillSets,
    fieldName: 'skills',
    push,
    remove
  })

  return (
    <>
      <Modal.Content>
        {children}
        <ApproveJobSubtitle>{title}</ApproveJobSubtitle>

        <Container bottom='small'>
          <MainSkillSelect
            skills={coreSkills}
            loading={getCoreSkillsLoading}
            onChange={skill => onSkillSelect(skill, true)}
            label='Main skill'
            name='mainSkillId'
            requiredDecoration
          />
        </Container>

        <Container bottom='small'>
          <Form.Checkbox
            titleCase={false}
            name='mainSkillBadFit'
            label='The Selected main skill isn’t a good fit'
          />

          {mainSkillBadFit && (
            <Form.Input
              required
              name='mainSkillBadFitComment'
              label='Comment'
              multiline
              rows={4}
              width='full'
              placeholder='Add reason why the main skill selected is not a good fit'
            />
          )}
        </Container>

        <Container bottom='small'>
          <RequiredSkillsAutocomplete
            jobId={jobId}
            defaultSkillCategoryId={defaultSkillCategory?.id ?? ''}
            onChange={onSkillSelect}
            label='Add skills'
            placeholder='Start typing...'
            required
          />

          <Container top='small'>
            <Typography size='xsmall'>
              To mark skills as required click on the asterisk
              <span css={S.asteriskIcon}>
                <AsteriskIcon color={palette.grey.dark} />
              </span>
              icon.
            </Typography>
          </Container>
        </Container>

        <Container bottom='small'>
          <SkillList
            skills={skillSets}
            coreSkills={coreSkills}
            onMainSkillChange={handleMainSkillChange}
            onSkillRatingChange={handleSkillRatingChange}
            onDelete={deleteSkill}
            onSkillRequiredChange={handleSkillRequiredChange}
          />
        </Container>

        {recommendedSkills && (
          <CenteredLoader loading={recommendedSkillsLoading}>
            <Container
              css={[recommendedSkillsLoading && S.recommendedSkillsLoader]}
            >
              <JobRecommendedSkills
                jobId={jobId}
                recommendedSkills={recommendedSkills}
                onAdd={skill => onSkillSelect(skill)}
              />
            </Container>
          </CenteredLoader>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={navigateToStep1}>
          Go Back
        </Button>
        <Form.SubmitButton variant='positive'>
          Next - Review Job Description
        </Form.SubmitButton>
      </Modal.Actions>
    </>
  )
}

export default ApproveJobStep2
