import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Section, Container } from '@toptal/picasso'

const AdditionalNotes = () => (
  <Container top='medium'>
    <Section title='Additional Notes' variant='withHeaderBar'>
      <Form.Input
        placeholder='Add notes'
        aria-label='Additional Notes'
        name='additionalNotes'
        multiline
        rows={4}
        width='full'
      />
    </Section>
  </Container>
)

export default AdditionalNotes
