import React, { forwardRef, useImperativeHandle } from 'react'
import { useField, useForm, Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'
import { titleize, compareAlphabetically } from '@staff-portal/string'
import { TalentVerticalFragment } from '@staff-portal/talents'

import { getVerticalById } from '../../utils'

interface ConvertToAnotherVerticalFormContentProps {
  verticals: TalentVerticalFragment[]
  screeningRoleSteps?: Maybe<{
    nodes: { id: string; status: string; step: { id: string; title: string } }[]
  }>
}

const ConvertToAnotherVerticalFormContent = forwardRef(
  (
    { verticals, screeningRoleSteps }: ConvertToAnotherVerticalFormContentProps,
    ref
  ) => {
    const form = useForm()

    useImperativeHandle(ref, () => ({ submit: () => form.submit() }))
    const {
      input: { value: toVerticalId }
    } = useField('toVerticalId')

    const selectedVertical = getVerticalById(toVerticalId, verticals)

    const isEnglishScreeningStepApproved = !!screeningRoleSteps?.nodes.some(
      roleStep =>
        roleStep.status === 'approved' && roleStep.step.title === 'English'
    )

    const specializationSelectorIsDisplayed =
      selectedVertical &&
      selectedVertical.specializations.nodes.length > 1 &&
      isEnglishScreeningStepApproved

    return (
      <>
        <Form.Select
          label='To'
          name='toVerticalId'
          required
          width='full'
          placeholder='Please select a vertical'
          data-testid='convert-to-vertical-select'
          options={verticals
            .map(({ id, talentType }) => ({
              text: titleize(talentType),
              value: id
            }))
            .sort((first, second) =>
              compareAlphabetically(first.text, second.text)
            )}
          onChange={event => {
            const newVertical = getVerticalById(event.target.value, verticals)

            if (!newVertical) {
              return
            }

            if (
              newVertical.specializations.nodes.length === 1 &&
              isEnglishScreeningStepApproved
            ) {
              form.change(
                'specializationId',
                newVertical.specializations.nodes[0].id
              )

              return
            }

            form.change('specializationId', null)
          }}
        />
        {specializationSelectorIsDisplayed && (
          <Form.Select
            label='Specialization'
            name='specializationId'
            required
            width='full'
            placeholder='Please select a specialization'
            data-testid='convert-to-specialization-select'
            options={
              selectedVertical?.specializations.nodes
                .map(({ id, title }) => ({
                  text: title,
                  value: id
                }))
                .sort((first, second) =>
                  compareAlphabetically(first.text, second.text)
                ) || []
            }
          />
        )}
        <Form.Input
          label='Comment'
          name='comment'
          placeholder='Please specify a reason.'
          required
          multiline
          rows={4}
          width='full'
        />
      </>
    )
  }
)

export default ConvertToAnotherVerticalFormContent
