let client = require("../client")

// 消息订阅操作
client.subscribe("testPublish")

client.on("message", (err, data) => {
  console.log(data)
})
