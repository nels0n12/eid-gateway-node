const express = require('express');
const axios = require("axios");
const router = express.Router();
const otpGenerator = require('otp-generator');

/* GET users listing. */
router.post('/', function (req, res, next) {
    // return res.send(req.body);
    let omang = req.body.omang;
    let tier = req.body.tier;


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'KLBzNwGVZMRF9c65MOMV7Cl8rhIMTu4z'
    }

    axios.get('http://168.167.72.220/verify/' + omang, { headers: headers })
        .then(function (response) {
            // console.log(response);
            if (response.data === true) {

                // tier1
                // tier2
                // tier3

                let otp = otpGenerator.generate(6, {
                    lowerCaseAlphabets: false,
                    upperCaseAlphabets: false,
                    specialChars: false
                });
                if (tier === 'tier1') {
                    return res.send({
                        "status": "success",
                        "message": "omang found",
                        "data": otp
                    })
                } else if (tier === 'tier2') {

                    axios.get('http://168.167.72.220/validate/' + omang, { headers: headers })
                        .then(function (response) {
                            // console.log(response);
                            return res.send({
                                "status": "success",
                                "message": "omang found",
                                "data":
                                    [
                                        {
                                            question: 'BIRTH_DTE',
                                            answer: response.data.data.BIRTH_DTE
                                        },
                                        {
                                            question: 'BIRTH_PLACE_NME',
                                            answer: response.data.data.BIRTH_PLACE_NME
                                        },
                                        {
                                            question: 'OCCUPATION_CDE',
                                            answer: response.data.data.OCCUPATION_CDE
                                        }
                                    ]
                            })
                        })
                        .catch(function (error) {
                            return res.send(error);
                        });

                } else {
                    return res.send({
                        "status": "success",
                        "message": "omang found",
                        "otp": otp
                    })
                }

                // const headers = {
                //     'Content-Type': 'application/json',
                //     'Accept': 'application/json'
                // }
                // sendMessage('26771667890', 'OTP Verification', 'OTP is '+otp)
                // axios.post('http://commanager-env.eba-yvcpxfrf.us-east-1.elasticbeanstalk.com/sms', {
                //     "number": "26771667890",
                //     "subject": "OTP Verification",
                //     "message": "OTP is "+otp
                // },{
                //     headers: headers
                // })
                //     .then(function (response) {
                //         console.log(response);
                //         })
                //         .catch(function (error) {
                //             console.log(error);
                //             return res.send({
                //                 "status":"error",
                //                 "message":"OTP could not be sent",
                //                 "otp":""
                //             })
                //         });
                //
                // }else{
                //     return res.send({
                //         "status":"error",
                //         "message":"omang not found",
                //         "otp":""
                //     })
            }
        })
        .catch(function (error) {
            // console.log(error);
            return res.send(error);
        });
});

function sendMessage(number, subject, message) {
    axios.post('http://commanager-env.eba-yvcpxfrf.us-east-1.elasticbeanstalk.com/sms', {
        "number": number,
        "subject": subject,
        "message": message
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

module.exports = router;
