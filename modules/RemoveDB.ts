import ListDBSync from './ListDBSync'
import fs from 'fs'

async function RemoveDB (id: string): Promise<boolean> {
  if (ListDBSync.getSyncMode() === 'client') return false
  if (id === undefined) return false
  if (!(ListDBSync.getAllDataId()).includes(id)) return false
  await Promise.resolve(ListDBSync.removeData(id))
  fs.rmSync(`${ListDBSync.getDirPath()}/volume/${id}.json`)
  return true
}

export default RemoveDB
