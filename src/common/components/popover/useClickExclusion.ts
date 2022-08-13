import {useEffect, RefObject} from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useClickExclusion = (ignoreRefList: RefObject<any>[], handler: (event: MouseEvent) => any) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const ignore = ignoreRefList.find((ref) => ref.current.contains(event.target))
      !ignore && handler(event)
    }

    addEventListener('mousedown', handleClickOutside)

    return () => removeEventListener('mousedown', handleClickOutside)
  }, [ignoreRefList, handler])
}
