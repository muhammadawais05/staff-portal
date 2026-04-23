import { useEffect, Dispatch, SetStateAction } from 'react'

export const useEscapeButtonEffect = (
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])
}
