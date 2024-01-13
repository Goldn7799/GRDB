import GRDB from './index'
// import SetupDB from './modules/SetupDB'

await GRDB.CreateInstance({
  path: `${process.cwd()}/test-idk`
})
// console.log(GRDB.AddDB('asua', 'array'))
console.log(GRDB.AddDB('asu', 'object'))
console.log(GRDB.WriteDB('asua', ['konci']))
console.log(GRDB.WriteDB('asu', { konci: 'a' }))
// console.log(GRDB.RemoveDB('asu'))
// console.log(await GRDB.ReadDB('asua'))
// console.log(GRDB.getDBList())
// await Promise.resolve(SetupDB(process.cwd() + '/test-idk'))
