import React from 'react'
import {useSelector} from 'common/hooks/useSelector'
import {HomeActions} from 'home/homeActions'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {Button} from 'common/components/button'
import {TextInput} from 'common/components/textInput'
import {Select} from 'common/components/select'
import {Table} from './table/table'

export const Content = () => {

  const {
    activeDatabase,
    isCreatingDatabaseVersion,
    hostDomain
  } = useSelector(({home}) => ({
    activeDatabase: home.activeDatabase,
    isCreatingDatabaseVersion: home.isCreatingDatabaseVersion,
    hostDomain: home.hostDomain
  }))

  const publishDatabase = () => {
    if (activeDatabase) {
      dispatch(HomeActions.publishDatabase(activeDatabase.name, '1.0.0'))
    }
  }

  const dispatch = useDispatch()
  const scope = global.document?.location?.hostname?.split('.')[0]
  const npmrcLine = `@${scope}:registry=${global.document?.location?.origin}/api/registry`
  const installCommand = `npm install @${scope}/${activeDatabase?.name}`
  const authLine = `//${global.document?.location?.origin}/api/registry/:_authToken=<token>`

  // npm config --location=project set @localhost:registry=http://localhost:3000/api/json/registry

  const deleteTable = (name: string) => () => dispatch(HomeActions.deleteDatabaseTable(
    activeDatabase?.id!,
    activeDatabase?.versions[0]?.version!,
    name)
  )

  return (
    <Frame>
      {
        activeDatabase && <>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

            <div>
              <h1>{activeDatabase.name}
                {activeDatabase.isBeingUpdated ? ' loading...' : ''}
                {activeDatabase.isBeingDeleted ? ' deleting...' : ''}
              </h1>
            </div>

            <div>

              <div style={{display: 'inline-block'}}>
                <Button onClick={publishDatabase}>
                  {activeDatabase.activeVersion?.isBeingPublished ? 'Publishing...' : 'Publish Database'}
                </Button>
              </div>

              <Status>{activeDatabase.versions[0]?.status}</Status>

              <Select>
                {activeDatabase.versions.map(({version}) => <option key={version.toString()}>version {version}</option>)}
              </Select>
              <div style={{display: 'inline-block'}}>
                <Button onClick={() => dispatch(HomeActions.createDatabaseVersion(activeDatabase.id))}>
                  {isCreatingDatabaseVersion ? 'Creating version...' : 'Create New Version'}
                </Button>
              </div>

              <div>
                <Button red onClick={() => dispatch(HomeActions.deleteDatabase(activeDatabase.id))}>
                  {activeDatabase.isBeingDeleted
                    ? `Deleting ${activeDatabase.name}...`
                    : `Delete ${activeDatabase.name}`}
                </Button>
              </div>
            </div>

          </div>

          <Line/>

          <br/>
          <br/>
          <br/>

          <SectionHeaderFrame>
            <div>
              <h3>~/.npmrc</h3>
            </div>
          </SectionHeaderFrame>

          <TextInput
            onChange={() => 1}
            value={authLine}/>

          <br/>
          <br/>
          <br/>

          <SectionHeaderFrame>
            <div>
              <h3>project/.npmrc</h3>
            </div>
          </SectionHeaderFrame>

          <TextInput
            onChange={() => 1}
            value={npmrcLine}/>

          <br/>
          <br/>
          <br/>

          <SectionHeaderFrame>
            <div>
              <h3>Install</h3>
            </div>
          </SectionHeaderFrame>

          <div style={{display: 'inline-block'}}>
            <a download href={`/api/tarball/${activeDatabase.name}/${activeDatabase.activeVersion?.version}`}><Button>Download package</Button></a>
          </div><br/><br/>

          <TextInput
            onChange={() => 1}
            value={installCommand}/>

          <br/>
          <br/>
          <br/>

          <SectionHeaderFrame>
            <div>
              <h3>Tables</h3>
            </div>
            <div>
              <Button
                onClick={() => dispatch(HomeActions.createDatabaseTable('', ''))}>
                Add table
              </Button>
            </div>
          </SectionHeaderFrame>
          {activeDatabase.versions[0]?.tables.map((table, idx) => {
            return (
              <Table
                onRequestDeleteTable={() => deleteTable(table.tableName)}
                name={table.tableName}
                columns={table.columns}
                key={idx}/>
            )
          })}

          <SectionHeaderFrame>
            <div>
              <h3>Methods</h3>
            </div>
            <div>
              <Button
                onClick={() => dispatch(HomeActions.createDatabaseTable('', ''))}>
                Add method
              </Button>
            </div>
          </SectionHeaderFrame>
          {activeDatabase.versions[0]?.methods}

        </>
      }

    </Frame>
  )
}

const Frame = styled.div`
  position: relative;
  padding: 20px;
`

const Status = styled.span`
  color: rgb(0, 95, 204);
  border-radius: 4px;
  padding: 5px;
  background: rgba(56, 139, 253, 0.15);
  text-transform: capitalize;
  margin-right: 20px;
  font-size: 13.3333px;
`

const Line = styled.div`
  position: relative;
  height: 1px;
  top: -15px;
  background: #3B3B3C;
  z-index: 100;
`

const SectionHeaderFrame = styled.div`
  position: relative;
  border-bottom: 1px solid #3B3B3C;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`