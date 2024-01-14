import fs from 'fs'

interface dataStructure {
  id: string
  type: 'array' | 'object'
}
type syncModeProperties = 'cross' | 'private' | 'client'

let isSync: boolean = false
let pathSync: string = ''
let dirPathSync: string = ''
let timeoutSync: number = 0
let data: dataStructure[] = []
let syncMode: syncModeProperties = 'client'

async function sync (): Promise<void> {
  if (syncMode === 'client' || syncMode === 'cross') {
    data = JSON.parse(await Promise.resolve(fs.readFileSync(pathSync, 'utf-8')))
  } else if (syncMode === 'private') {
    fs.writeFileSync(pathSync, JSON.stringify(data))
  };
  setTimeout(() => {
    if (isSync) {
      sync().catch(() => {})
    };
  }, timeoutSync)
}

async function start (path: string, timeout: number, mode: syncModeProperties): Promise<boolean> {
  if (path === '' || timeout < 1000) return false
  isSync = true
  pathSync = `${path}/data/database-list.json`
  dirPathSync = path
  timeoutSync = timeout
  syncMode = mode
  const readFile = async (): Promise<string> => fs.readFileSync(pathSync, 'utf-8')
  data = JSON.parse(await readFile())
  sync().catch(() => {})
  return true
}

function stop (): void {
  isSync = false
}

function getData (): dataStructure[] {
  return data
}

function getIsSync (): boolean {
  return isSync
}

function getDirPath (): string {
  return dirPathSync
}

function getSyncMode (): syncModeProperties {
  return syncMode
}

async function addData (id: string, type: 'array' | 'object'): Promise<boolean> {
  if (syncMode === 'client') return false
  if (syncMode === 'private') {
    data.push({ id, type })
  } else if (syncMode === 'cross') {
    const tempData: dataStructure[] = JSON.parse(await Promise.resolve(fs.readFileSync(pathSync, 'utf-8')))
    tempData.push({ id, type })
    fs.writeFileSync(pathSync, JSON.stringify(tempData))
  }
  return true
}

async function removeData (thisId: string): Promise<boolean> {
  if (syncMode === 'client') return false
  if (syncMode === 'private') {
    data = data.filter(thisData => thisData.id !== thisId)
  } else if (syncMode === 'cross') {
    let tempData: dataStructure[] = JSON.parse(await Promise.resolve(fs.readFileSync(pathSync, 'utf-8')))
    tempData = tempData.filter(thisData => thisData.id !== thisId)
    fs.writeFileSync(pathSync, JSON.stringify(tempData))
  }
  return true
}

function getAllDataId (): string[] {
  return data.map(thisData => thisData.id)
}

function getDBProperties (id: string): dataStructure {
  const thisDataFiltered: dataStructure = data.filter(thisData => thisData.id === id)[0]
  return thisDataFiltered
}

const ListDBSync = {
  start,
  stop,
  getIsSync,
  getData,
  getDirPath,
  getAllDataId,
  getDBProperties,
  getSyncMode,
  addData,
  removeData
}

export default ListDBSync
