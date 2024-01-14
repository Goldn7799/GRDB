import ListDBSync from './ListDBSync'
import fs from 'fs'

function WriteDB (id: string, newData: object | any[]): boolean {
  if (ListDBSync.getSyncMode() === 'client') return false
  if (id === undefined && newData === undefined) return false
  if (!(ListDBSync.getAllDataId()).includes(id)) return false
  if (!((ListDBSync.getDBProperties(id).type === 'array' && Array.isArray(newData)) || (ListDBSync.getDBProperties(id).type === 'object' && typeof newData === 'object'))) return false
  fs.writeFileSync(`${ListDBSync.getDirPath()}/volume/${id}.json`, JSON.stringify(newData))
  return true
}

export default WriteDB
