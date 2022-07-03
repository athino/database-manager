

export const forEachParent = async (firstParentElement: HTMLElement | null | undefined, iterator: (element: HTMLElement) => void) => {
    let currentElement = firstParentElement
    while (currentElement && currentElement.tagName !== 'HTML') {
      iterator(currentElement)
      currentElement = currentElement.parentElement
    }
}