const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

//register view engine
app.set('view engine','ejs');

//connect to mongodb
const dbURI = 'mongodb+srv://ninjamayank:Mayank%40123@cluster0.gflw2z1.mongodb.net/node-crash?retryWrites=true&w=majority';
mongoose.connect(dbURI).then(() => {
    app.listen(3000);
}).catch((err) => console.log(err));

app.use(express.static('public'));
app.use(morgan('dev'));

// app.get('/add-blog',(req,res) => {
//     const blog = new Blog({
//         title : 'new blog 2',
//         snippet : 'About my blog',
//         body : 'More about my blog'
//     });
//     blog.save()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         })
// })

// app.get('/all-blogs',(req,res) => {
//     Blog.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch(err => console.log(err));
// })

app.get('/',(req,res) => {
    //res.send('<p>Home Page</p>')
    res.redirect('/blogs');
});

app.get('/about',(req,res) => {
    //res.send('<p>About Page</p>')
    res.render('about', {title : 'About'});
});

app.get('/blogs',(req,res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title: 'All blogs', blogs : result});
        })
        .catch(err => console.log(err));
})

app.get('/blogs/create',(req,res) => {
    res.render('create', {title : 'Create a new blog'});
})

//404 page
app.use((req,res) => {
    res.status(404).render('404', {title : '404'});
});