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
    const { title, year, rating } = req.body;
    if (!title || !year) {
      res.status(403).send(` status: ${res.statusCode}, error: true, message: 'you have to provide a title and a year'`);
    } else if (year.length < 4 || year.length > 4 || isNaN(year)) {
      res.status(403).send(` status: ${res.statusCode}, error: true, message: 'make sure you put 4 digits'`);
    }
    try {
      const newMovie = await Movie.create({ title, year, rating });
      res.status(200).json({ message: 'Movie has been added successfully' });
    } catch (err) {
      console.error('Error adding movie:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
})

app.get('/movies/search', function (req, res) {
let search = req.query.s;
if (search) {
    res.status(200).json(`status: ${res.statusCode}, message: 'ok', data: ${search} `);
} else {
    res.status(500).json(` status: ${res.statusCode}, error: true, message: you have to provide a search`);
}
})

app.get('/movies/delete', function (req, res) {

})

app.get('/movies/read', function (req, res) {
    res.status(200).send({ status:res.statusCode, message : movies})
})

app.get('/movies/read/by-date', function (req,res)  {
    movies.sort((a, b) => a.year - b.year);
    res.status(200).send({status:200 , message:'listed by date', data:movies})
})

app.get('/movies/read/by-rating', function (req,res) {
    movies.sort((a, b) => a.rating - b.rating);
    res.status(200).send({status:200 , message:'listed by Rating', data:movies})
})
  
app.get('/movies/read/by-title', function (req,res)  {
    movies.sort((a, b) => a.title.localeCompare(b.title));
    res.status(200).send({status:200 , message:'listed by Title', data:movies})
}) 

app.get('/movies/update', function (req, res) {

})

app.get('/movies/read/id/:id', function (req, res) {
    const { id } = req.params;
    const movie = movies.find((m) => m.id === parseInt(id));
    if (movie) {
      res.status(200).json({ status: 200, data: movie });
    } else {
      res.status(404).json({ status: 404, error: true, message: `The movie ${id} does not exist` });
    }
})

app.post('/movies/add', async function (req, res) {
    const { title, year, rating } = req.body;
    if (!title || !year) {
      res.status(403).json({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year'});
    } else if (year.length < 4 || year.length > 4 || isNaN(year)) {
      res.status(403).json({ status: 403, error: true, message: 'make sure you put 4 digits'});
    }
    try {
      const newMovie = await Movie.create({ title, year, rating });
      res.status(200).json({ message: 'Movie added' });
    } catch (err) {
      console.error('Error adding movie:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
})