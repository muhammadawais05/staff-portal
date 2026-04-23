import { EmailTemplate, EmailTemplateEdge } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const emailTemplateEdgeMock = (
  node?: Partial<EmailTemplateEdge>
): EmailTemplateEdge => {
  const body = 'Template 1 body'

  return {
    __typename: 'EmailTemplateEdge',
    node: {
      __typename: 'EmailTemplate',
      id: '1',
      name: 'Template 1\n\n{{sender.first_name}}',
      rawTemplate: body,
      ...node?.node
    },
    rendered: {
      __typename: 'EmailTemplateRendered',
      subject: 'Subject',
      body,
      ...node?.rendered
    }
  } as EmailTemplateEdge
}

export const emailTemplateEdgesMock = (edgesCount: number) =>
  [...Array(edgesCount).keys()].map(index => {
    const id = encodeEntityId(`${index + 1}`, 'EmailTemplate')

    const templateBody = `Template ${index} body\n\n{{sender.first_name}}`

    return emailTemplateEdgeMock({
      node: {
        id,
        name: `Template ${index}`,
        private: false,
        rawTemplate: templateBody,
        targetRole: {
          title: 'title',
          value: 'value'
        }
      } as EmailTemplate,
      rendered: {
        body: templateBody
      }
    } as EmailTemplateEdge)
  })
