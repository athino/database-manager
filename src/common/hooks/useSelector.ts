import {useSelector as useReduxSelector, TypedUseSelectorHook} from 'react-redux'
import {RootState} from 'common/config/rootReducer'

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
