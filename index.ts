import CreateInstance from './modules/CreateInstance'
import AddDB from './modules/AddDB'
import RemoveDB from './modules/RemoveDB'
import ReadDB from './modules/ReadDB'
import WriteDB from './modules/WriteDB'
import ListDBSync from './modules/ListDBSync'
import Operation from './modules/Operation'

const grdb = {
  Internal: {
    getIsSync: ListDBSync.getIsSync
  },
  CreateInstance,
  AddDB,
  RemoveDB,
  ReadDB,
  WriteDB,
  getDBList: ListDBSync.getData,
  Operation
}

export default grdb
