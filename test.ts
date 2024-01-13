import GRDB from './index'
// import SetupDB from './modules/SetupDB'

await GRDB.CreateInstance({
  path: `${process.cwd()}/test-idk`
})
// console.log(GRDB.AddDB('asua', 'array'))
// console.log(GRDB.WriteDB('asua', ['kontol']))
console.log(GRDB.RemoveDB('asu'))
console.log(await GRDB.ReadDB('asua'))
console.log(GRDB.getDBList())
// await Promise.resolve(SetupDB(process.cwd() + '/test-idk'))
