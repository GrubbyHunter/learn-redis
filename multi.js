let redis = require("redis")
let client = redis.createClient()

client.on("connect", () => {
  console.log("******redis 连接成功******")

  // set类型的相关操作
  client
    .multi([
      ["set", "newString001", "value001", "ex", "500"],
      ["ttl", "newString001"],
      ["sadd", "newSet", "set001", "set002"]
    ])
    .exec((err, result) => {
      // ["OK", 500, 0] ，三个操作的结果汇集成一个数组返回
      console.log("******事务执行完成******", result)
    })
})
