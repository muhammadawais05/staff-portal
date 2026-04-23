import React, { ComponentType } from 'react'
import {
  Container,
  QuestionMark16,
  Tag,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'

type Item = {
  id: string
  note?: string | null
  primary?: boolean | null
}

type Props<Node, NodeData> = {
  nodes: Node[]
  nodeData: NodeData
  viewer: ComponentType<Node & { index: number } & NodeData>
}

const EditableFieldArrayView = <Node extends Item, NodeData>({
  nodes,
  nodeData,
  viewer: Viewer
}: Props<Node, NodeData>) => (
  <Container flex direction='column' gap='xsmall'>
    {nodes?.map((node, index) => (
      <Container
        flex
        gap='xsmall'
        key={node.id}
        data-testid={`EditableFieldArrayView-item-${index}`}
      >
        <TypographyOverflow as='div'>
          <Viewer {...node} {...nodeData} index={index} />
        </TypographyOverflow>
        {node.note && (
          <Tooltip content={`Note: ${node.note}`} interactive>
            <Container alignItems='center' flex>
              <QuestionMark16 />
            </Container>
          </Tooltip>
        )}
        {node.primary && (
          <Container
            data-testid={`EditableFieldArrayView-primary-label-${index}`}
          >
            <Tag.Rectangular>Primary</Tag.Rectangular>
          </Container>
        )}
      </Container>
    ))}
  </Container>
)

export default EditableFieldArrayView
