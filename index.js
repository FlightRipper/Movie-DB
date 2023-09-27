const express = require('express')
const app = express()
app.listen(3000)
let now = new Date()
let hours = now.getHours()
let seconds = now.getSeconds()
const movies = [
    { title: 'Jaws', year: 1975, rating: 8, id: 1 },
    { title: 'Avatar', year: 2009, rating: 7.8, id: 2 },
    { title: 'Brazil', year: 1985, rating: 8, id: 3 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2, id: 4 },
];


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

app.post('/movies/create', async (req, res) => {

})

app.get('/movies/search', function (req, res) {
let search = req.query.s;
if (search) {
    res.status(200).json(`status: ${res.statusCode}, message: 'ok', data: ${search} `);
} else {
    res.status(500).json(` status: ${res.statusCode}, error: true, message: you have to provide a search`);
}
})

