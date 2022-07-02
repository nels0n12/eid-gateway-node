const express = require('express');
const axios = require("axios");
const router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
    // return res.send(req.body);
    let omang = req.body.omang;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'KLBzNwGVZMRF9c65MOMV7Cl8rhIMTu4z'
    }

    axios.get('http://168.167.72.220/validate/' + omang, { headers: headers })
        .then(function (response) {
            // console.log(response);
            if (response.data.status === 'success')
            {
                return res.send({
                    "status": "success",
                    "message": "omang found",
                    "data": response.data.data
                })
            }else{

                return res.send({
                    "status": "error",
                    "message": "omang not found",
                    "data": ''
                })
            }
        })
        .catch(function (error) {
            // console.log(error);
            return res.send(error);
        });
});

module.exports = router;
