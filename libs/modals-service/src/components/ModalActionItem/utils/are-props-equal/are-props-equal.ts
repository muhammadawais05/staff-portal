import shallowequal from 'shallowequal'

import { Props as ModalActionItemProps } from '../../ModalActionItem'

type Props = Omit<ModalActionItemProps, 'componentType'> &
  Partial<Pick<ModalActionItemProps, 'componentType'>>

const arePropsEqual = (prevProps: Props, nextProps: Props): boolean => {
  const { modalProps: prevModalProps, ...restPrevProps } = prevProps
  const { modalProps: nextModalProps, ...restNextProps } = nextProps

  if (
    prevModalProps &&
    nextModalProps &&
    !shallowequal(prevModalProps, nextModalProps)
  ) {
    return false
  }

  return shallowequal(restPrevProps, restNextProps)
}

export default arePropsEqual
