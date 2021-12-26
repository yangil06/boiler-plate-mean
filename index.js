const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const config = require('./confg/key')

const {User} = require('./models/User')
//application-x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extendeded: true
}));
//application/json
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!~~안녕하세요 ~ 수고~')
})

app.post('/register', (req, res)=>{
    //회원 가입 할 때 필요한 정보들을 client 에서 가져오면 데이터베이스에 넣는다.
    // {
    //     id: "hello", ...
    // }
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if(err) return res.json({sucess: false, err});
        return res.status(200).json({
            sucess: true
        });
    });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})