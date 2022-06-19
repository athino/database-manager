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

  const list = Object.entries(databases).map(([_, {name, isBeingUpdated}]) => ({id: name, name, isBeingUpdated}))

  return (
    <ViewA
      headerComponent={<></>}
      contentComponent={<Content/>}
      sidebarContent={{
        onSelectItem: (item) => dispatch(HomeActions.selectDatabase(item.name)),
        selectedId: activeDatabase,
        list: list,
        onCreateNew: (name) => dispatch(HomeActions.createDatabase(name))
      }}
    />
  )
}