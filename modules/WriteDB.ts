import ListDBSync from './ListDBSync'
import fs from 'fs'

function WriteDB (id: string, newData: object | any[]): boolean {
  if (id === undefined) return false
  if (!(ListDBSync.getData()).includes(id)) return false
  fs.writeFileSync(`${ListDBSync.getDirPath()}/volume/${id}.json`, JSON.stringify(newData))
  return true
}

export default WriteDB
