const mongoose = require('mongoose');

const EventDetailsSchema = new mongoose.Schema({
 
    erc20asset:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'assets'
    },
    address :{
        type: String,
        required: true
    },

    blockHash :{
        type: String,
        required: true
    },

    blockNumber :{
        type: Number,
        required: true
    },

    logIndex :{
        type: Number,
        required: true
    },

    removed :{
        type: Boolean,
        required: true
    },

    transactionHash :{
        type: String,
        required: true
    },
    transactionIndex:{
        type: Number,
        required: true
    },

    id:{
        type: String,
        required: true
    },

    returnValues:{
        0:{
            type: String,
            required: true
        },
        1:{
            type: String,
            required: true
        },
        2:{
            type: String,
            required: true
        },
        from:{
            type: String
        },
        to:{
            type: String
        },
        owner:{
            type: String
        },
        spender:{
            type: String
        },
        value:{
            type: String,
            required: true
        }
    },
    event:{
        type: String,
        required: true
    },
    signature:{
        type: String,
        required: true
    },
    raw:{
        data:{
            type: String,
            required: true
        },
        topics:{
           type: [String],
           required: true
        }
    }


});

EventDetailsSchema.index({ blockHash : 1, transactionHash: 1,  logIndex: 1 }, { unique: true })

module.exports=EventDetails=mongoose.model('events',EventDetailsSchema);
