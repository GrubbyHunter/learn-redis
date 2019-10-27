let redis = require("redis")
let client = redis.createClient()

client.on("connect", () => {
  console.log("******redis 连接成功******")

  // set类型的相关操作
  client.sadd("newSet", "item1", "item2", (err, data) => {
    console.log("往newSet集合添加两个元素: ", data) // 2
  })

  client.sadd("newSet1", "item1", "item3", (err, data) => {
    console.log("往newSet1集合添加两个元素: ", data)
    // 2
  })

  client.sdiff("newSet", "newSet1", (err, data) => {
    console.log("获取两个集合中不同的元素: ", data) //  ["set002", "set001", "item2"]
  })

  client.sinter("newSet", "newSet1", (err, data) => {
    console.log("获取两个集合中相同的元素: ", data) // ["item1"]
  })

  client.sunion("newSet", "newSet1", (err, data) => {
    console.log("获取两个集合的并集: ", data) //  ["set001", "item2", "item1", "item3", "set002"]
  })

  client.smove("newSet", "newSet1", "set001", (err, data) => {
    console.log("将newSet中的set001移动到newSet1 ", data)
  })

  client.scard("newSet", (err, data) => {
    console.log("获取newSet集合元素个数: ", data) // 4
  })

  client.sismember("newSet", "item2", (err, data) => {
    console.log("判断item2是否存在newSet集合: ", data) // 1
  })

  client.sscan("newSet", 0, (err, data) => {
    // 这里是增量遍历，0表示从头开始遍历，一般一次遍历不会遍历完
    // 第一个参数会返回下次开始遍历的位置，下次调用sscan时候这个0就要使用第一个参数返回的值
    console.log("遍历集合中的元素", data) // ["0", Array(2)]
  })

  client.srem("newSet", "item1", "item2", (err, data) => {
    console.log("移除集合中的item1和item2两个元素: ", data) // 2
  })
})
