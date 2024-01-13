import ListDBSync from './ListDBSync'
import fs from 'fs'

async function ReadDB (id: string): Promise<object | any[] | boolean> {
  if (id === undefined) return false
  if (!(ListDBSync.getData()).includes(id)) return false
  const thisData = await Promise.resolve(fs.readFileSync(`${ListDBSync.getDirPath()}/volume/${id}.json`, 'utf-8'))
  return JSON.parse(thisData)
}

export default ReadDB
