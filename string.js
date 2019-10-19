let redis = require("redis")
let client = redis.createClient()

client.on("connect", () => {
  console.log("******redis 连接成功******")

  // string类型的相关操作
  client.set("newString", "value001", (err, data) => {
    console.log("设置string: ", data) // ok
  })

  client.get("newString", (err, data) => {
    console.log("获取string: ", data) // value001
  })

  client.type("newString", (err, data) => {
    console.log("newString的值类型为: ", data) // string
  })

  client.exists("newString", (err, data) => {
    console.log("判断newString这个key是否存在:", data) // 1
  })

  client.rename("newString", "newString1", (err, data) => {
    console.log("将newString重命名为newString1:", data) // ok
  })

  client.expire("newString1", 30, (err, data) => {
    console.log("给newString1设置30秒过期时间:", data) // 1
  })

  setTimeout(() => {
    client.ttl("newString1", (err, data) => {
      console.log("newString1剩余过期时间:", data) // 27
    })
    client.del("newString1", (err, data) => {
      console.log("删除string1: ", data) // 1
    })
  }, 3000)
})
