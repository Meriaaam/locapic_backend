var express = require('express');
var router = express.Router();
require('../models/connection');
var Marker = require('../models/markers');
const {checkBody} = require('../modules/checkbody');


router.post('/',(req, res) => {
    if (!checkBody(req.body, ['nickname', 'name' , 'latitude' , 'longitude'])) {
        res.json({ result: false, error: 'Missing fields' });
        return;
    }

    Marker.findOne({nickname: req.body.nickname, name: req.body.name})
    .then(data => {
        if(data === null){
            const newMarker = new Marker({
                nickname: req.body.nickname,
                name: req.body.name,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            });
        
            newMarker.save().then(newDoc => {
                res.json({result: true, newDoc: newDoc});
            });
        }
        else{
            res.json({result: false, error: 'place already saved'});
        }
    })


});

router.get('/:nickname', (req, res) => {
    Marker.find({nickname: req.params.nickname})
    .then(data => {
        res.json({result: true, places:data});
    });
});

router.delete('/', (req, res) => {
    Marker.deleteOne({nickname: req.body.nickname, name: req.body.name})
    .then(data => {
        res.json({result: true})
    })
})


module.exports = router;