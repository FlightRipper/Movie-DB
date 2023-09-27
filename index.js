const express = require('express')
const app = express()
app.listen(3000)
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

app.get('/hello/:id?', (req, res) => {
    const {id} = req.params;
    if (id) {
        res.status(200).json({ status: 200, message: `Hello, ${id}` });
    } else {
      res.status(200).json({ status: 200, message: 'Hello, World!' });
    }
})

app.get('/search', (req, res) => {
    const Kousa = req.query.s;
    if (Kousa) {
      res.status(200).json({ status: 200, message: 'ok', data: Kousa });
    } else {
      res.status(500).json({ status: 500, error: true, message: 'you have to provide a search' });
    }
})
