import {useEffect, RefObject} from 'react'

export const useClickAway = (ref: RefObject<HTMLElement>, handler: (event: MouseEvent) => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetIsRefOrInsideRef = ref.current?.contains(event.target as Node)
      const targetIsRef = ref.current?.isSameNode(event.target as Node)

      if (targetIsRef) {
        handler(event)
      } else if (!targetIsRefOrInsideRef) {
        handler(event)
      }
  
    }

    addEventListener('mousedown', handleClickOutside)

    return () => {
      removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
}
