import ListDBSync from './ListDBSync'
import WriteDB from './WriteDB'
import ReadDB from './ReadDB'

async function pushData (id: string, newData: string | object): Promise<boolean> {
  if (id === undefined || newData === undefined) return false
  if (!(ListDBSync.getAllDataId()).includes(id)) return false
  if ((ListDBSync.getDBProperties(id)).type !== 'array') return false
  const lastDB: any[] = JSON.parse(JSON.stringify(await ReadDB(id)))
  lastDB.push(newData)
  WriteDB(id, lastDB)
  return true
}

async function removeData (id: string, index: number): Promise<boolean> {
  if (id === undefined || index === null) return false
  if (!(ListDBSync.getAllDataId()).includes(id)) return false
  if ((ListDBSync.getDBProperties(id)).type !== 'array') return false
  const lastDB: any[] = JSON.parse(JSON.stringify(await ReadDB(id)))
  lastDB.splice(index, 1)
  WriteDB(id, lastDB)
  return true
}

const Operation = {
  pushData,
  removeData
}

export default Operation
