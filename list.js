let redis = require("redis")
let client = redis.createClient()

client.on("connect", () => {
  console.log("******redis 连接成功******")

  // list类型的相关操作
  client.lpush("newList", "item1", "item2", (err, data) => {
    console.log("往newList链表头部的插入两个元素: ", data) // 2
  })

  client.rpush("newList", "item3", "item4", (err, data) => {
    console.log("往newList链表尾部的插入两个元素: ", data) // 4
  })

  client.linsert("newList", "BEFORE", "item4", "newItem", (err, data) => {
    console.log("在item4的元素之前插入一个元素", data)
  })

  client.lrange("newList", 0, 10, (err, data) => {
    console.log("获取newList链表下标从0到10的元素：", data) // ["item2", "item1", "item2", "item1", "item3", "item4"]
  })

  client.rpoplpush("newList", "newList001", (err, data) => {
    console.log("将newList中的最后一个元素移除，插入newList001的头部：", data)
    // ["item2", "item1", "item2", "item1", "item3", "item4"]
  })

  client.ltrim("newList", 2, 4, (err, data) => {
    console.log("只保留newList下标是2和4之间的元素", data) //ok
  })

  client.lrange("newList", 0, 10, (err, data) => {
    console.log("获取newList链表下标从0到10的元素：", data) // ["item2", "item1", "item2", "item1", "item3", "item4"]
  })

  client.lrange("newList001", 0, 10, (err, data) => {
    console.log("获取newList001：", data) // ["item4"]
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

  client.rpop("newList", (err, data) => {
    console.log("删除newList链表尾部元素并返回此元素：", data) // "item4"
  })

  client.lrem("newList", 1, "item2", (err, data) => {
    // cout大于0表示从左往右查找，移除count个
    // count小于0，从右往左查找，移除count的绝对值个
    // count等于0，移除所有值为value的元素
    console.log("删除newList链表中值为item2的元素：", data) // 1
  })
})
