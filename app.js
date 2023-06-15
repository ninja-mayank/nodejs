const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//register view engine
app.set('view engine','ejs');

//connect to mongodb
const dbURI = 'mongodb+srv://ninjamayank:Mayank%40123@cluster0.gflw2z1.mongodb.net/node-crash?retryWrites=true&w=majority';
mongoose.connect(dbURI).then(() => {
    app.listen(3000);
}).catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
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

app.use('/blogs',blogRoutes)
//404 page
app.use((req,res) => {
    res.status(404).render('404', {title : '404'});
});