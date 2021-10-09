import MQL from '@/plugins/mql.js'

export async function callMQLOpen (activityName, data) {
  const mql = await new MQL()
    .setActivity(`o.[${activityName}]`)
    .setData(data)
    .fetch()

  // return mql
  return mql.raw[activityName].result
}

export async function getMQL (activityName) {
  const mql = await new MQL()
    .setActivity(`o.[${activityName}]`)
    .fetch()
  return mql.raw[activityName].result
}

export async function callMQLRestricted (activityName, data, token) {
  const mql = await new MQL()
    .setActivity(`r.[${activityName}]`)
    .setHeader({ Authorization: token })
    .setData(data)
    .fetch()
  return mql.raw
}
