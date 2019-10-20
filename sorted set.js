let redis = require("redis")
let client = redis.createClient()

client.on("connect", () => {
  console.log("******redis 连接成功******")

  // set类型的相关操作
  client.zadd(
    "newSortSet",
    10,
    "item1",
    1,
    "item2",
    5,
    "item3",
    (err, data) => {
      console.log("往newSortSet集合添加3个元素，同时给他们加上分数: ", data) // 3
    }
  )

  client.zrange("newSortSet", 0, 3, (err, data) => {
    console.log("获取下标为0到3之间的元素", data) // ["item2", "item3", "item1"]
  })

  client.zrange("newSortSet", 0, 3, "WITHSCORES", (err, data) => {
    console.log("获取下标为0到3之间的元素，同时返回他们的score", data) // ["item2", "1", "item3", "5", "item1", "10"]
  })

  client.zrem("newSortSet", "item2", "item3", (err, data) => {
    console.log("移除item2和item3这两个元素", data) // 2
  })
})
