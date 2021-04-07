// add dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// add routes
const AuthRouter = require('./routes/auth');
const ApiDescription = require('./routes/apiDescription');
const PostRouter = require('./routes/post');
const BookmarkRouter = require('./routes/bookmark');
const ChatRouter = require('./routes/chat');
const CommentRouter = require('./routes/comment');
const DisLikeRouter = require('./routes/disLike');
const LikeRouter = require('./routes/like');
const OrderRouter = require('./routes/order');
const RecentSeesRouter = require('./routes/recentSees');
const ViewsRouter = require('./routes/views');
const CategoryRouter = require('./routes/category');
const TagsRouter = require('./routes/tags');
const MenuRouter = require('./routes/menu');


// use dependencies
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan(":remote-addr  - :method - :status - :url - :response-time ms - :user-agent"));


// use routes
app.use('/', PostRouter);
app.use('/auth', AuthRouter);
app.use('/api-description', ApiDescription);
app.use('/bookmarks', BookmarkRouter);
app.use('/chat', ChatRouter);
app.use('/comments', CommentRouter);
app.use('/dis-likes', DisLikeRouter);
app.use('/likes', LikeRouter);
app.use('/orders', OrderRouter);
app.use('/recent-sees', RecentSeesRouter);
app.use('/views', ViewsRouter);
app.use('/categories', CategoryRouter);
app.use('/tags', TagsRouter);



// connect to mongoose
mongoose.connect(process.env.MONGO_ADDRESS, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log("Connect to Hozh API db");
}).catch(err => {
    console.log("you have some error in Hozh API db: ", err);
})


// listen your project
app.listen(5000, () => {
    console.log(`Listening on ${process.env.PORT || 5000}`);
})
