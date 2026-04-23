import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { GridItemField } from '@staff-portal/ui'
import { Container, SkeletonLoader, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

import { GetJobCreateVerticalsDocument } from './data/get-job-create-verticals/get-job-create-verticals.staff.gql.types'

const JobCreateVerticalsField = () => {
  const { data, loading } = useQuery(GetJobCreateVerticalsDocument, {
    throwOnError: true,
    fetchPolicy: 'cache-first'
  })

  return (
    <GridItemField
      alignItems='flex-start'
      label='Job Type'
      labelFor='verticalId'
      required
      size='medium'
    >
      {loading &&
        !data &&
        Array.from(Array(7).keys()).map(item => (
          <Container key={item} top={item ? 'small' : undefined}>
            <SkeletonLoader.Typography rows={2} />
          </Container>
        ))}

      {data && (
        <Form.RadioGroup
          id='verticalId'
          name='verticalId'
          defaultValue={data.verticals.nodes[0].id}
          required
        >
          {data.verticals.nodes.map(
            ({ id, name, jobType: { hint } }, index) => (
              <Container key={id} top={index ? 'small' : undefined}>
                <Form.Radio
                  value={id}
                  label={
                    <>
                      {name} Job
                      <Container top={0.25}>
                        <Typography size='xxsmall'>{hint}</Typography>
                      </Container>
                    </>
                  }
                />
              </Container>
            )
          )}
        </Form.RadioGroup>
      )}
    </GridItemField>
  )
}

export default JobCreateVerticalsField
