import ListDBSync from './ListDBSync'
import fs from 'fs'

async function AddDB (id: string, type: 'array' | 'object'): Promise<boolean> {
  if (ListDBSync.getSyncMode() === 'client') return false
  if (id === undefined || type === undefined) return false
  if ((ListDBSync.getAllDataId()).includes(id)) return false
  let thisData: object | any[] | null = null
  if (type === 'array') {
    thisData = []
  } else if (type === 'object') {
    thisData = {}
  } else {
    return false
  }
  await Promise.resolve(ListDBSync.addData(id, type))
  fs.writeFileSync(`${ListDBSync.getDirPath()}/volume/${id}.json`, JSON.stringify(thisData))
  return true
}

export default AddDB
