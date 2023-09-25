const express = require('express')
const app = express()

let now = new Date()
let hours = now.getHours()
let seconds = now.getSeconds()

app.get("/" , (req , res) => 
{
    console.log("Kousa")
    res.send("Kousa")
}
)

app.get("/test" , (req , res) =>
{
    res.status(200).send({ status:res.statusCode, message:"test"})
}
)
app.get("/time" , (req , res) =>
    res.status(200).send({ status:res.statusCode, message : hours + "" + seconds}
)
)



app.listen(3000)