import React from 'react'
import {useSelector} from 'common/hooks/useSelector'
import {HomeActions} from 'home/homeActions'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {Button} from 'common/components/button'
import {TextInput} from 'common/components/textInput'
import {Select} from 'common/components/select'
import {Table} from './table/table'
import { Npm } from 'common/components/npm'

export const Content = () => {
  const dispatch = useDispatch()

  const {
    version,
    database,
  } = useSelector(({home}) => {
    const database = home.databases[`${home.activeDatabase}`]
    return {
      version: database?.versions[`${database?.activeVersionSemver}`],
      database: database
    }
  })

  const publishDatabase = () => {
    if (database && version) {
      dispatch(HomeActions.publishDatabase(database.name, version.id))
    }
  }
  const scope = global.document?.location?.hostname?.split('.')[0]
  const npmrcLine = `npm config set @${scope}:registry ${global.document?.location?.origin}/api/registry --location project`
  const authLine = `npm config set //${global.document?.location?.host}/:_authToken 11e7f0f2-314a-45ca-b156-176df2f13e93`
  const installCommand = `npm install @${scope}/${database?.name}`

  const deleteTable = (name: string) => () => {
    if (database && version) {
      dispatch(HomeActions.deleteDatabaseTable(
        database?.name,
        version?.semver,
        name)
      )
    }
  }

  const downloadLink = `/api/tarball/@${scope}/${database?.name}/-/${database?.name}-${'1.0.0'}.tgz`

  return (
    <Frame>
      {
        database && <>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

            <div>
              <h1>{database.name}
                {database.isBeingUpdated ? ' loading...' : ''}
                {database.isBeingDeleted ? ' deleting...' : ''}
              </h1>
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

              {version?.status === 'unpublished' && 
              <div style={{display: 'inline-block'}}>
                <Button onClick={publishDatabase} disabled={version?.isBeingPublished}>
                  {version?.isBeingPublished ? 'Publishing...' : 'Publish Database'}
                </Button>
              </div>
              }

              <Status>{version?.status}</Status>

              <Select>
                {Object.entries(database.versions).map(([_key, {semver}]) => <option key={semver}>version {semver}</option>)}
              </Select>
              <div style={{display: 'inline-block'}}>
                <Button onClick={() => dispatch(HomeActions.createDatabaseVersion(database.name))}>
                  {'isCreatingDatabaseVersion' ? 'Creating version...' : 'Create New Version'}
                </Button>
              </div>

              <div>
                <Button red onClick={() => dispatch(HomeActions.deleteDatabase(database.name))}>
                  {database.isBeingDeleted
                    ? `Deleting ${database.name}...`
                    : `Delete ${database.name}`}
                </Button>
              </div>
            </div>

          </div>

          <Line/>

          <br/>

          {version?.status === 'published' &&
            <>
              <SectionHeaderFrame>
                <div>
                  <h3>Install</h3>
                </div>
              </SectionHeaderFrame>
              Open your terminal, `cd` into the project directory, and run the following commands:<br/><br/>

              <div style={{display: 'flex'}}>
                <div style={{display: 'flex'}}>
                  <Npm/>
                </div>
                <div style={{flexGrow: 1}}>
                  <TextInput
                    onChange={() => 1}
                    value={npmrcLine}/>
                  <br/>
                  <br/>
                  <TextInput
                    onChange={() => 1}
                    value={authLine}/>
                  <br/>
                  <br/>
                  <TextInput
                      onChange={() => 1}
                      value={installCommand}/>
                  <br/>
                  <br/>
                </div>
              </div>
              <div style={{ display: 'inline-block' }}>
                <a download href={downloadLink}><Button>Download package</Button></a>
              </div>
              <br/>
              <br/>
              <br/>
            </>
          }

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
          {/*version?.tables.map((table, idx) => {
            return (
              <Table
                onRequestDeleteTable={() => deleteTable(table.tableName)}
                name={table.tableName}
                columns={table.columns}
                key={idx}/>
            )
          })*/}

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
          {/*version?.methods*/}

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