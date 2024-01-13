import fs from 'fs'

async function SetupDB (path: string): Promise<boolean> {
  try {
    fs.readdirSync(`${path}`)
  } catch (e) {
    try {
      fs.mkdirSync(`${path}`)
    } catch (e) {
      console.log(`Failed to create ${path}`)
      console.error(e)
      return false
    }
  }
  try {
    fs.readdirSync(`${path}/data`)
  } catch (e) {
    try {
      fs.mkdirSync(`${path}/data`)
    } catch (e) {
      console.log(`Failed to create ${path}/data`)
      console.error(e)
      return false
    }
  }
  try {
    fs.readdirSync(`${path}/volume`)
  } catch (e) {
    try {
      fs.mkdirSync(`${path}/volume`)
    } catch (e) {
      console.log(`Failed to create ${path}/volume`)
      console.error(e)
      return false
    }
  }
  try {
    fs.readFileSync(`${path}/data/database-list.json`)
  } catch (e) {
    try {
      fs.writeFileSync(`${path}/data/database-list.json`, JSON.stringify([]))
    } catch (e) {
      console.log(`Failed to create ${path}/data/database-list.json`)
      console.error(e)
      return false
    }
  }
  return true
}

export default SetupDB
