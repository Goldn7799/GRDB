import ListDBSync from './ListDBSync'
import fs from 'fs'

function RemoveDB (id: string): boolean {
  if (id === undefined) return false
  if (!(ListDBSync.getAllDataId()).includes(id)) return false
  ListDBSync.removeData(id)
  fs.rmSync(`${ListDBSync.getDirPath()}/volume/${id}.json`)
  return true
}

export default RemoveDB
