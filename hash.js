let redis = require("redis")
let client = redis.createClient()

client.on("connect", () => {
  console.log("******redis 连接成功******")

  // hash类型的相关操作
  client.hset("newHash", "field1", "value1", (err, data) => {
    console.log("設置newHash的field1: ", data) // 1
  })

  client.hmset(
    "newHash",
    "field1",
    "value2",
    "field2",
    "value002",
    (err, data) => {
      console.log("同时設置newHash的多个field: ", data) // OK
    }
  )

  client.hget("newHash", "field1", (err, data) => {
    console.log("获取newHash的field1: ", data) // value2
  })

  client.hgetall("newHash", (err, data) => {
    console.log("获取newHash的全部field和value: ", data) // Object {field1: "value2", field2: "value002"}
  })

  client.hkeys("newHash", (err, data) => {
    console.log("获取newHash的全部field: ", data) // ["field1", "field2"]
  })

  client.hvals("newHash", (err, data) => {
    console.log("获取newHash的全部value: ", data) // ["value2", "value002"]
  })

  client.hexists("newHash", "field2", (err, data) => {
    console.log("判断newHash的中是否存在field2: ", data) // 1
  })

  client.hdel("newHash", "field2", (err, data) => {
    console.log("删除newHash的中的field2: ", data) // 1
  })
})
