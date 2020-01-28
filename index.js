const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('listening on port 3000');
})

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get('/', (req, res) => {
    res.send('ok');
})
app.get('/test', (req, res) => {
    res.send({
        status: 200,
        message: "ok"
    })
})

app.get('/movies/create', (req, res) => {
    var title = req.param('title');
    var year = req.param('year');
    var rating = req.param('rating');
    if (title && year.length == 4){
        var movie = { title, year };
        rating ? movie.rating = rating : movie.rating = 4;
        movies.push(movie);
    }
    else {
        res.status(403).send({
            status: 403,
            error: true,
            message: "You cannot create a movie without providing a title and a year"
        })
    }
    res.redirect('/movies/read')
})
app.get('/movies/read/:order?', (req, res) => {
    var order = req.params.order;
    if (order == "date"){
        res.send({
            status: 200,
            data: movies.sort((a,b) => (a.year > b.year) ? 1 : ((b.year > a.year) ? -1 : 0)) 
        })
    }
    else if (order == "rating"){
        res.send({
            status: 200,
            data: movies.sort((a,b) => (a.rating > b.rating) ? -1 : ((b.rating > a.rating) ? 1 : 0))
        })
    }
    else if (order == "title"){
        res.send({
            status: 200,
            data: movies.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
        })
    }
    else {
        res.send({
            status: 200,
            data: movies
        })
    }
})
app.get('/movies/read/id/:id', (req, res) => {
    var id = req.params.id;
    if(id){
        if(movies[id]){
            res.send({
                status: 200,
                data: movies[id]
            })
        }
        else{
            res.send({
                status: 404,
                message: "The id " + id + " does not exist"
            })
        }
    }
})
app.get('/movies/update/:id', (req, res) => {
    var id = req.params.id;
    var title = req.param('title');
    var year = req.param('year');
    var rating = req.param('rating');
    if (movies[id]){
        title ? movies[id].title = title : null;
        year ? movies[id].year = year : null;
        rating ? movies[id].rating = rating : null;
    }
    res.redirect('/movies/read')
})
app.get('/movies/delete/:id', (req, res) => {
    var id = req.params.id;
    if(movies[id]){
        movies.splice(id, 1);
    }
    res.redirect('/movies/read')
})

// app.get('/time', (req, res) => {
//     var d = new Date(); 
//     var h = d.getHours(); 
//     var m = d.getMinutes(); 
//     var s = d.getSeconds();
//     res.send({
//         status: 200,
//         time: h + ":" + m + ":" + s
//     })
// })
// app.get('/hello/:id?', (req, res) => {
//     res.send({
//         status: 200,
//         message: "Hello " + req.params.id
//     })
// })
// app.get('/search', (req, res) => {
//     var s = req.param('s')
//     if (s){
//         res.send({
//             status: 200,
//             message: "ok",
//             data: s
//         })
//     }
//     else{
//         res.status(500).send({
//             status: 500,
//             error: true,
//             message: "You have to provide a search"
//         });
//     }
// })