import {useEffect, RefObject} from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useClickExclusion = (ignoreRefList: RefObject<any>[], handler: (event: MouseEvent) => any) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const ignore = ignoreRefList.map((ref) => !(ref.current && !ref.current.contains(event.target))).includes(true)

      if (!ignore) {
        handler(event)
      }
    }

    addEventListener('mousedown', handleClickOutside)

    return () => {
      removeEventListener('mousedown', handleClickOutside)
    }
  }, [ignoreRefList, handler])
}
