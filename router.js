const { Router } = require('express')
// const path = require('path')
const router = new Router()

var gtfsParse = require('./gtfsParse');

// url访问localhost/userlist?id=xxx&name=yyy，这种方式可以通过req.query.id获取参数的值
// router.get('/userlist/', function(req, res, next) {
// 严格按照localhost/userlist/xxx/yyy的形式访问,如果少传一个参数就会报404错误，通过req.params.id获取对应的参数的值
// router.get('/userlist/:id/:name', function(req, res, next) {
router.get('/:routeId', function (req, res) {
  console.log('get get request', req.params.routeId)
  gtfsParse.queryGTFSData(req.params.routeId, function(err, result) {
    if (err) {//dosomething
        res.send('Error in requesting GTFS')
    }
    res.json(result);
    // console.log('request returned')
    // console.log('------------------------------')
    }
  )
});

router.post('/', function (req, res) {
  console.log('get post request', req.body)
  gtfsParse.queryGTFSData(req.body.routeId, function(err, result) {
    if (err) {//dosomething
        res.send('Error in requesting GTFS')
    }
    res.json(result);
    // console.log('request returned')
    // console.log('------------------------------')
    }
  )
});

module.exports = router