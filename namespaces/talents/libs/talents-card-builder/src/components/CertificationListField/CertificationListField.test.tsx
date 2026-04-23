import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { FinalForm } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import CertificationListField, {
  CertificationListFieldProps
} from './CertificationListField'
import getProfileCertificationMock from '../../mocks/get-profile-certification-mock/get-profile-certification-mock'

const renderComponent = (props: Pick<CertificationListFieldProps, 'data'>) =>
  render(
    <TestWrapper>
      <FinalForm onSubmit={jest.fn()} initialValues={{ certifications: [] }}>
        {({ values }) => (
          <>
            <CertificationListField name='certifications' {...props} />
            <span data-testid='preview'>
              {values.certifications
                .map(({ id }: { id: string }) => id)
                .join(',')}
            </span>
          </>
        )}
      </FinalForm>
    </TestWrapper>
  )

describe('CertificationListField', () => {
  it('toggles the item on click', () => {
    const certification = getProfileCertificationMock({
      id: 'certification-1',
      certificate: 'Master of the universe',
      institution: 'Post office'
    })

    renderComponent({
      data: [certification]
    })

    expect(screen.getByTestId('preview').textContent).toBe('')

    fireEvent.click(screen.getByText('Master of the universe'))

    expect(screen.getByTestId('preview').textContent).toBe('certification-1')
  })
})
