import ListDBSync from './ListDBSync'
import SetupDB from './SetupDB'

interface instance {
  path: string
  timeout?: null | number
}

async function CreateInstance (config: instance): Promise<boolean> {
  const isSetupSuccess = await Promise.resolve(SetupDB(config.path))
  if (isSetupSuccess) {
    await ListDBSync.start(config.path, config.timeout ?? 1000)
    return true
  } else {
    return false
  }
}

export default CreateInstance
