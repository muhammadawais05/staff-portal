import React, { useRef, useEffect } from 'react'
import { useFormState } from '@toptal/picasso-forms'

import { ApproveJobForm } from '../../types'

const ScrollToTop = () => {
  const {
    values: { skipSkillsChecks, skipQualityChecks }
  } = useFormState<ApproveJobForm>()

  const contentRef = useRef<HTMLDivElement>(null)

  /**
   * Scroll the modal to top whenever step is changed
   * even when going back to previous step.
   */
  useEffect(() => {
    const dialogElement = contentRef.current?.closest('[role="dialog"]')

    if (dialogElement) {
      dialogElement.scrollTop = 0
    }
  }, [skipSkillsChecks, skipQualityChecks, contentRef])

  return <div ref={contentRef} />
}

export default ScrollToTop
