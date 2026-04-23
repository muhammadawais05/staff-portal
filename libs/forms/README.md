# Staff Portal forms

This package provides components and utilities related to form handling.

## useHandleMutationResult hook

`useHandleMutationResult` hook provides a generic way to handle GQL mutation
result with [final-form](https://final-form.org/react) which is used under the
hood in
[picasso-forms](https://picasso.toptal.net/?path=/story/picasso-forms-folder--form).
It provides handlers to:

- show field level errors
- form level error
- success message

The shape of `mutationResult` for it to work:

```tsx
type MutationResult = {
  success: boolean
  errors: Array<{ key: string; message: string }>
}
```

Usage:

```tsx
import { useHandleMutationResult } from '@staff-portal/forms'

// ...

const { handleMutationResult } = useHandleMutationResult()

const handleSubmit = async (formValues) => {
  const { data } = await runMutation(formValues)

  return handleMutationResult({
    // this has to have the same shape as defined above
    mutationResult: data?.mutationResult,
    successNotificationMessage: 'Mutation runs successfully!'
  })
}

// ...

<Form onSubmit={handleSubmit}>
```

## concatUnexpectedValidationErrors util

`concatUnexpectedValidationErrors` function is used to get any error that is not
`base` or `field-level` errors

```tsx
const mutationErrors = handleMutationResult(/*...*/)

if (mutationErrors) {
  const { validationErrors } = mutationErrors

  if (validationErrors) {
    const unexpectedValidationErrors = concatUnexpectedValidationErrors(
      validationErrors,
      Object.keys(formValues) // from onSubmit handler
    )

    if (unexpectedValidationErrors) {
      showError(unexpectedValidationErrors)
    }
  }

  return
}
```
