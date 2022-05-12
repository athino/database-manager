import {ViewA} from 'common/components/views/viewA'
import {useSelector} from 'common/hooks/useSelector'
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Content} from './content/content'
import {HomeActions} from './homeActions'

export default function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(HomeActions.initializeDatabases())
    dispatch(HomeActions.getHostUrl())
  }, [])

  const {
    databases,
    activeDatabase
  } = useSelector(({home}) => ({
    databases: home.databases,
    activeDatabase: home.activeDatabase,
  }))

  return (
    <ViewA
      headerComponent={<></>}
      contentComponent={<Content/>}
      sidebarContent={{
        onSelectItem: (item) => dispatch(HomeActions.selectDatabase(item.id.toString())),
        selectedId: activeDatabase?.id!,
        list: databases,
        onCreateNew: (name) => dispatch(HomeActions.createDatabase(name))
      }}
    />
  )
}