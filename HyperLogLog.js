let redis = require("redis")
let client = redis.createClient()

client.on("connect", () => {
  console.log("******redis 连接成功******")
  let i = 0

  while (i < 2000) {
    // HyperLogLog类型的相关操作
    client.pfadd("newHyperLog", `STRING00${i}`, (err, data) => {
      console.log("插入一条HyperLogLog数据", data) // 1
    })
    i++
  }

  client.pfcount("newHyperLog", (err, data) => {
    console.log(`总共有${data}条HyperLogLog数据`) // 1992 条数据
  })
})
