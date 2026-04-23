import React, { ComponentType, useState } from 'react'
import { Button, Container, Plus24 } from '@toptal/picasso'
import { FieldArray, FinalField, Form, FormSpy } from '@toptal/picasso-forms'
import { MAX_INT_LENGTH } from '@staff-portal/config'

import { EditableFieldArrayItem } from './components'
import { useRemove, useSetPrimary } from './hooks'

type GetItemProps<T> = {
  itemIndex: number
  disabled: boolean
  items?: T[]
  formName: string
  autoFocus?: boolean
}

type Props<T> = {
  handleReset?: () => void
  formName: string
  itemLabel: string
  maxItemsCount?: number
  noButtons?: boolean
  getNewItem: (items: T[]) => T
  editor: ComponentType<GetItemProps<T>>
  autoFocus?: boolean
}

const EditableFieldArray = <T extends { destroy?: boolean | null }>({
  handleReset,
  formName,
  itemLabel,
  editor: Editor,
  getNewItem,
  maxItemsCount = MAX_INT_LENGTH,
  noButtons = false,
  autoFocus = false
}: Props<T>) => {
  const [focusIndex, setFocusIndex] = useState(autoFocus ? 0 : -1)
  const { setPrimary } = useSetPrimary(formName)
  const { remove } = useRemove(formName)

  return (
    <FormSpy subscription={{ submitting: true }}>
      {({ submitting }) => (
        <Container>
          <FieldArray name={formName}>
            {({ fields }) => {
              const availableItems = fields.value.filter(
                ({ destroy }) => !destroy
              )
              const handleAddItem = () => {
                setFocusIndex(fields?.length ?? 0)
                fields.push(getNewItem(availableItems))
              }

              return (
                <>
                  {fields.map((_, itemIndex) => (
                    <FinalField
                      name={`${formName}.${itemIndex}.destroy`}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${formName}.${itemIndex}.destroy`}
                    >
                      {({ input: { value: isDestroyed } }) =>
                        !isDestroyed && (
                          <EditableFieldArrayItem
                            onRemove={() =>
                              remove({
                                fields,
                                itemIndex
                              })
                            }
                            onSetPrimary={() =>
                              setPrimary({
                                fields,
                                itemIndex
                              })
                            }
                            formName={formName}
                            itemIndex={itemIndex}
                            submitting={submitting}
                          >
                            <Editor
                              itemIndex={itemIndex}
                              items={fields.value}
                              disabled={submitting}
                              formName={formName}
                              autoFocus={itemIndex === focusIndex}
                            />
                          </EditableFieldArrayItem>
                        )
                      }
                    </FinalField>
                  ))}
                  {maxItemsCount > availableItems.length && (
                    <Container>
                      <Button.Action
                        icon={<Plus24 />}
                        disabled={submitting}
                        onClick={handleAddItem}
                        data-testid='EditableFieldArray-add'
                      >
                        Add a {itemLabel}
                      </Button.Action>
                    </Container>
                  )}
                </>
              )
            }}
          </FieldArray>
          {!noButtons && (
            <Container top='small'>
              <Button
                data-testid='EditableFieldArray-cancel'
                variant='secondary'
                onClick={handleReset}
                disabled={submitting}
                size='small'
              >
                Cancel
              </Button>
              <Form.SubmitButton
                data-testid='EditableFieldArray-save'
                variant='positive'
                size='small'
              >
                Save
              </Form.SubmitButton>
            </Container>
          )}
        </Container>
      )}
    </FormSpy>
  )
}

export default EditableFieldArray
