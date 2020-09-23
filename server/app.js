const express = require('express')
const app = new express()
const City = require("./moudle/city")
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




app.post('/user/login', function(req, res) {
    // req.session.token='加密算法生成随机token'
    // const data={"code":20000,"data":{"roles":["editor"],"token":req.session.token,"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
    const data = {
        "code": 20000,
        "data": {
            "token": "asasasasas",
            "orangiseid": 'wwwwwwww',
            "introduction": "I am a super administrator",
            "avatar": "https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2020-09-22/7afe3efb3e8fb391539e4e821e9ece28.jpg",
            "name": "Super Admin"
        }
    }
    res.json(data)
})
app.get('/user/info', function(req, res) {
    const data = {
        "code": 20000,
        "data": {
            "roles": ["admin"],
            "introduction": "I am a super administrator",
            "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
            "name": "Super Admin"
        }
    }
    res.json(data)
})
app.post('/user/logout', function(req, res) {
    res.json({ "code": 20000, "message": "success" })
})
app.post('/city/data', function(req, res) {
    const city = new City(req.body)
    city.save().then(mon => {
        if (mon) {
            res.json({
                msg: "数据添加成功"
            })
        }

    })
})
app.get('/city/list', async(req, res) => {
    // console.log(req.query)
    const pagesize = req.query.pagesize || 3;
    const page = req.query.page || 1;
    const stats = (Number(page) - 1) * Number(pagesize)
    const num = Number(pagesize)
    const total = await City.find()
    const list = await City.find().skip(stats).limit(num)
    res.json({
        msg: "数据查询成功",
        list: list,
        total: total.length
    })
})
app.delete("/city/:id", function(req, res) {

    City.findByIdAndDelete(req.params.id).then(mon => {
        if (mon) {
            res.json({
                msg: "数据删除成功"
            })
        }
    })
})
app.listen(8888, '127.0.0.1')