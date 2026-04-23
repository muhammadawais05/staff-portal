import React from 'react'
import { useField, Form } from '@toptal/picasso-forms'

const CustomSignerFields = () => {
  const {
    input: { value: customSigner }
  } = useField<'true' | 'false'>('customSigner')

  if (customSigner !== 'true') {
    return null
  }

  return (
    <>
      <Form.Input name='signerFullName' label='Full Name:' required />
      <Form.Input name='signerEmail' label='Email:' required />
    </>
  )
}

export default CustomSignerFields
