import { Container, Radio, Typography } from '@toptal/picasso'
import React, { FC, memo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SortField } from '../../utils'

const displayName = 'Sorter'

interface Props {
  sortFields: SortField[]
  onValueChange: (value: SortField) => void
  initialValue?: string
}

const Sorter: FC<Props> = memo<Props>(
  ({ sortFields, onValueChange, initialValue }) => {
    const [value, setValue] = useState<string>(initialValue || '')
    const { t: translate } = useTranslation('billingDetails')

    const changeHandler = (event: React.ChangeEvent<{ value: string }>) => {
      setValue(event.target.value)
      onValueChange(
        sortFields.find(field => field.name === event.target.value) as SortField
      )
    }

    return (
      <Container flex top={1} bottom={1}>
        <Container right={1}>
          <Typography inline size='xsmall'>
            {translate(
              'modals.consolidationDefault.fields.engagements.sortOrder.label'
            )}
          </Typography>
        </Container>
        <Container>
          <Radio.Group
            name='sortBy'
            onChange={changeHandler}
            horizontal
            value={value}
          >
            {sortFields.map(({ label, name }) => (
              <Radio
                label={label}
                value={name}
                key={name}
                data-testid={`${displayName}-${name}}`}
              />
            ))}
          </Radio.Group>
        </Container>
      </Container>
    )
  }
)

Sorter.displayName = displayName

export default Sorter
