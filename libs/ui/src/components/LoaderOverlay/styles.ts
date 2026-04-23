import { css } from 'styled-components'

const overlayStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  background: rgba(255 255 255 / 80%);
`
const loaderPositionTop = css`
  justify-content: flex-start;
  padding-top: 5%;
`

const wrapper = css`
  position: relative;
`

/**
 * TODO : remove after Picasso will support it
 * @deprecated Picasso forms should support `flex` display like
 * (<Modal> should have flex display at this point, as Material UI modals have)
 * ---
 * import { Form } from '@toptal/picasso-forms'
 *
 * <Modal as={Form} onSubmit={..} initialValues={..}>
 *   <Modal.Header />
 *   <Modal.Content />
 *   <Modal.Footer>
 *     <Form.SubmitButton />
 *   </Modal.Footer>
 * </Modal>
 * ---
 */
export const modalContainerWithForm = css`
  &,
  & > div, /* super weird solution, but that's the only possible way for now */
  & > form,
  & > div > form, {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
`

export { loaderPositionTop, overlayStyle, wrapper }
