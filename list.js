let redis = require("redis")
let client = redis.createClient()

client.on("connect", () => {
  console.log("******redis 连接成功******")

  // list类型的相关操作
  // client.lpush("newList", "item1", "item2", (err, data) => {
  //   console.log("往newList链表头部的插入两个元素: ", data) // 2
  // })

  // client.rpush("newList", "item3", "item4", (err, data) => {
  //   console.log("往newList链表尾部的插入两个元素: ", data) // 4
  // })
  client.lrange("newList", 0, 10, (err, data) => {
    console.log("获取newList链表下标从0到10的元素：", data) // ["item2", "item1", "item2", "item1", "item3", "item4"]
  })

  client.lindex("newList", 4, (err, data) => {
    console.log("获取newList链表下标为4的元素：", data) // "item3"
  })

  client.lset("newList", 4, "newItem3", (err, data) => {
    console.log("设置newList链表下标为4的元素为新值：", data) // OK
  })

  client.lpop("newList", (err, data) => {
    console.log("删除newList链表表头元素并返回此元素：", data) // "item2"
  })
})
