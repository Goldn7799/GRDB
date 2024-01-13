import fs from 'fs'

let isSync: boolean = false
let pathSync: string = ''
let dirPathSync: string = ''
let timeoutSync: number = 0
let data: string[] = []

function sync (): void {
  fs.writeFileSync(pathSync, JSON.stringify(data))
  setTimeout(() => {
    if (isSync) {
      sync()
    };
  }, timeoutSync)
}

async function start (path: string, timeout: number): Promise<void> {
  if (path === '' || timeout < 1000) return
  isSync = true
  pathSync = `${path}/data/database-list.json`
  dirPathSync = path
  timeoutSync = timeout
  const readFile = async (): Promise<string> => fs.readFileSync(pathSync, 'utf-8')
  data = JSON.parse(await readFile())
  sync()
}

function stop (): void {
  isSync = false
}

function getData (): string[] {
  return data
}

function getIsSync (): boolean {
  return isSync
}

function getDirPath (): string {
  return dirPathSync
}

function addData (newData: string): boolean {
  data.push(newData)
  return true
}

function removeData (thisData: string): boolean {
  const thisDataIndex: number = data.indexOf(thisData)
  data.splice(thisDataIndex, 1)
  return true
}

const ListDBSync = {
  start,
  stop,
  getIsSync,
  getData,
  getDirPath,
  addData,
  removeData
}

export default ListDBSync
