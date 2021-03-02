const express = require('express');
const cors = require('cors');
const router = express.Router();
//const config = require('config');
const {check, validationResult} = require('express-validator');
const goscan = require('../../blockchain/readevents');

const EventDetails=require('../../models/EventDetails');

//@route    GET api/fetchevent
//@desc     retrieve Transfer/Approval events for a specified asset
//@access   Public

router.get('/',cors(),async (req,res)=>{
    try {

        //const profiles = await User.find().populate('user',['name','avatar']);
        //let eventlist=[]
        let eventlist = await EventDetails.find({}).sort({'blockNumber':-1,'transactionIndex':-1,});
        console.log(typeof(eventlist),eventlist.length)
       // console.log(eventlist)
        //res.json(eventlist);
       res.send(eventlist);

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');        
    }

});

router.post('/scan',cors(),

            [
            check('erc20','Provide a valid ethereum ERC20 asset address!').isEthereumAddress(),
            check('user','Provide a valid ethereum EOA address').isEthereumAddress(),
            ],

            async (req,res)=>{

                const errors = validationResult(req);
                if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }

             try {
        
                    console.log(req.body.erc20,req.body.user);
                    //res.json(req.body);
                    const eventlist =await goscan(req.body.erc20,req.body.user);
                    
                    res.send(eventlist);

                 } catch (err) {
       
                 console.error(err.message);
                 res.status(500).send('Server Error');        
                }

});

module.exports = router;
