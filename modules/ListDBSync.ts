import fs from 'fs'

interface dataStructure {
  id: string
  type: 'array' | 'object'
}

let isSync: boolean = false
let pathSync: string = ''
let dirPathSync: string = ''
let timeoutSync: number = 0
let data: dataStructure[] = []

function sync (): void {
  fs.writeFileSync(pathSync, JSON.stringify(data))
  setTimeout(() => {
    if (isSync) {
      sync()
    };
  }, timeoutSync)
}

async function start (path: string, timeout: number): Promise<boolean> {
  if (path === '' || timeout < 1000) return false
  isSync = true
  pathSync = `${path}/data/database-list.json`
  dirPathSync = path
  timeoutSync = timeout
  const readFile = async (): Promise<string> => fs.readFileSync(pathSync, 'utf-8')
  data = JSON.parse(await readFile())
  sync()
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

function addData (id: string, type: 'array' | 'object'): boolean {
  data.push({ id, type })
  return true
}

function removeData (thisId: string): boolean {
  data = data.filter(thisData => thisData.id !== thisId)
  return true
}

function getAllDataId (): string[] {
  return data.map(thisData => thisData.id)
}

function getDBProperties (id: string): dataStructure {
  // if (!(getAllDataId()).includes(id)) return false
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
  addData,
  removeData
}

export default ListDBSync
