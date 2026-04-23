import React, { forwardRef } from 'react'
import {
  Section,
  Container,
  TypographyOverflow,
  Typography
} from '@toptal/picasso'
import { DetailedList as DL, LinkWrapper } from '@staff-portal/ui'
import { SimpleHtmlFormatter } from '@staff-portal/string'

import { PlaybookTemplateFragment } from '../../data/playbook-fragment.staff.gql.types'
import PlaybookTemplatePriority from '../PlaybookTemplatePriority/PlaybookTemplatePriority'
import EditPlaybookTemplateButton from '../EditPlaybookTemplateButton'
import { dueDateFormat, humanize, recurringFormat } from './utils'

type Props = {
  playbookTemplate: PlaybookTemplateFragment
}

const PlaybookTemplateCard = forwardRef<HTMLDivElement, Props>(
  ({ playbookTemplate }: Props, ref) => {
    return (
      <Container top='medium'>
        <Section
          variant='withHeaderBar'
          title={
            <TypographyOverflow
              weight='inherit'
              tooltipContent={playbookTemplate.description}
            >
              <LinkWrapper
                wrapWhen={Boolean(playbookTemplate.webResource.url)}
                href={playbookTemplate.webResource.url as string}
              >
                {playbookTemplate.description}
              </LinkWrapper>
            </TypographyOverflow>
          }
          actions={
            <EditPlaybookTemplateButton
              playbookTemplateId={playbookTemplate.id}
              operation={playbookTemplate.operations.updatePlaybookTemplate}
            />
          }
          data-testid='playbook-template-card'
          ref={ref}
        >
          <Container bottom='medium'>
            <Typography as='div' weight='regular' size='medium'>
              <SimpleHtmlFormatter text={playbookTemplate.details || ''} />
            </Typography>
          </Container>
          <DL>
            <DL.Row>
              <DL.Item
                label='Due date'
                value={dueDateFormat({
                  dueDateRuleUnit:
                    playbookTemplate.dueDateRuleUnit ?? undefined,
                  dueDateRuleAmount:
                    playbookTemplate.dueDateRuleAmount ?? undefined
                })}
              />
              <DL.Item
                label='Priority'
                value={
                  <PlaybookTemplatePriority
                    priority={playbookTemplate.priority}
                  />
                }
              />
            </DL.Row>
            {playbookTemplate.recurring && (
              <DL.Row>
                <DL.Item
                  label='Recurring'
                  value={recurringFormat({
                    recurring: playbookTemplate.recurring
                  })}
                />
              </DL.Row>
            )}
            {playbookTemplate.flowLink && (
              <DL.Row>
                <DL.Item
                  label='BPM Flow'
                  value={
                    <LinkWrapper
                      wrapWhen={Boolean(playbookTemplate.flowLink.url)}
                      href={playbookTemplate.flowLink.url as string}
                      target='_blank'
                    >
                      {humanize(playbookTemplate.flowLink.text)}
                    </LinkWrapper>
                  }
                />
              </DL.Row>
            )}
            <DL.Row>
              <DL.Item label='Identifier' value={playbookTemplate.identifier} />
            </DL.Row>
          </DL>
        </Section>
      </Container>
    )
  }
)

export default PlaybookTemplateCard
