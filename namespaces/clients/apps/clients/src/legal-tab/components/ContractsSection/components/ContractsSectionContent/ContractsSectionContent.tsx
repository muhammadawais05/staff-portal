import React from 'react'
import { Checkbox, Container, Section, EmptyState } from '@toptal/picasso'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import ContractItem from '../ContractItem'
import SendSTAButton from '../SendSTAButton/SendSTAButton'
import { SECTION_TITLE } from '../../utils/constants'
import { GetContractsQuery } from '../../data/get-contracts'

export type Props = {
  isSubsidiarySelected: boolean
  company: NonNullable<GetContractsQuery['staffNode']>
  onSubsidiaryChange: (isSelected: boolean) => void
  onMutationSuccess?: () => void
}

const ContractsSectionContent = ({
  company,
  onMutationSuccess,
  onSubsidiaryChange,
  isSubsidiarySelected
}: Props) => {
  const {
    id: companyId,
    children,
    contracts,
    contact: defaultContact,
    operations: { sendSTA: sendSTAOperation }
  } = company

  const hasContracts = Boolean(contracts?.nodes.length)
  const hasChildren = Boolean(children?.totalCount)

  if (
    !hasContracts &&
    !hasChildren &&
    sendSTAOperation.callable === OperationCallableTypes.HIDDEN
  ) {
    return null
  }

  return (
    <Section
      title={SECTION_TITLE}
      variant='withHeaderBar'
      actions={
        <>
          {hasChildren && (
            <Container left='small'>
              <Checkbox
                label='Show Subsidiary Contracts'
                checked={isSubsidiarySelected}
                onChange={(_, checked) => onSubsidiaryChange(checked)}
              />
            </Container>
          )}

          {defaultContact && (
            <SendSTAButton
              clientId={companyId}
              operation={sendSTAOperation}
              defaultContact={defaultContact}
              isSubsidiarySelected={isSubsidiarySelected}
            />
          )}
        </>
      }
    >
      {!hasContracts && (
        <EmptyState.Collection>
          There are no contracts on the list.
        </EmptyState.Collection>
      )}
      {contracts?.nodes.map((contract, index, { length }) => (
        <ContractItem
          clientId={companyId}
          contract={contract}
          key={contract.id}
          onMutationSuccess={onMutationSuccess}
          last={index === length - 1}
        />
      ))}
    </Section>
  )
}

export default ContractsSectionContent
