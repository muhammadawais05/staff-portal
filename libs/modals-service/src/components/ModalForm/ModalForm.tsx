import React, { ReactNode } from 'react'
import { Container } from '@toptal/picasso'
import { Form, FormProps } from '@toptal/picasso-forms'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import Modal from '../Modal'
import * as S from '../Modal/styles'

type Props<T> = FormProps<T> & {
  title: ReactNode
}

const ModalForm = <T extends object>({
  title,
  children,
  ...props
}: Props<T>) => (
  <Container css={S.modalContentWrapper}>
    <Form<T> {...props}>
      <Modal.Title>
        {title}
        <FormBaseErrorContainer top='small' bottom={0} />
      </Modal.Title>
      {children}
    </Form>
  </Container>
)

export default ModalForm
