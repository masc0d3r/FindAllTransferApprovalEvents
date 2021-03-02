const Web3 = require('web3');
const config = require('config');
const Assets=require('../models/Assets');
const EventDetails=require('../models/EventDetails');
const infuraURI = config.get('infuraURI');
// Token Contract
const abi = require('./erc20abi');
const web3 = new Web3(infuraURI)

console.log("infuraURI---getting ", infuraURI);

const goscan = async (erc20address, user)=> {

   const contract = new web3.eth.Contract(abi, erc20address);
   let assetExists = await Assets.findOne({erc20asset:erc20address});
   
   let fromBlock;

   fromBlock= assetExists ?  assetExists.lastscannedblock + 1 : 0;
   
   const toBlock = await web3.eth.getBlockNumber( (error, result)=>{ 
            if (error)
            console.error(error);
        });

    console.log("fromBlock ", fromBlock)
    console.log("toBlock ", toBlock)
 
    const topics_TransferApproval=[
                                    Web3.utils.keccak256("Transfer(address,address,uint256)"),
                                    Web3.utils.keccak256("Approval(address,address,uint256)")
                                ];
    console.log("topics_TransferApproval", topics_TransferApproval);

    const topic_indexed=web3.utils.padLeft((user).toLowerCase(),64)
    console.log("topic_indexed", topic_indexed);

    const events_topic1 = await getPastEvents(contract,11706570,11706578,topics_TransferApproval,topic_indexed,null);
    const events_topic2 = await getPastEvents(contract,11706570,11706578,topics_TransferApproval,null,topic_indexed);
    
    const logevents=[...events_topic1, ...events_topic2]
    
    await savePastEventsDB(logevents,erc20address,toBlock)
    
    console.log(logevents.length)

    const eventList = await EventDetails.find({adress:erc20address});
        
    return eventList
}

const getPastEvents = async (contract, fromBlock, toBlock,topic0,topic1,topic2) => {
    
       
    if (fromBlock <= toBlock) {
        
        try {
            console.log("getPastEvents....");
            let pastEvents = await contract.getPastEvents(
                'allEvents',
                {
               topics: [topic0,topic1,topic2],
                fromBlock: fromBlock,
                toBlock: toBlock
                });

            console.log(" length " + pastEvents.length,"from block " + fromBlock," to block " + toBlock);
            console.log(pastEvents.filter(key => (key.returnValues[0].toString()=="0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11")).length)
            console.log(pastEvents.filter(key => (key.returnValues[1].toString()=="0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11")).length)
            console.log(pastEvents.filter(key => (key.returnValues[0].toString()=="0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11" || key.returnValues[1].toString()=="0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11")).length)

            return pastEvents;
       }
        catch (error) {
            
            const midBlock = (fromBlock + toBlock) >> 1;
            const arr1 = await getPastEvents(contract, fromBlock, midBlock,topic1,topic2);
            const arr2 = await getPastEvents(contract, midBlock + 1, toBlock,topic1,topic2);
            return [...arr1, ...arr2];
            
        }
    }
    return [];
}

const savePastEventsDB =  async (eventLog,erc20Asset,lastscannedBlock) => {

    let assetExists = await Assets.findOneAndUpdate(
        {erc20asset:erc20Asset},
        {$set:{lastscannedblock:lastscannedBlock}},
        {new:true}
    );

    if(!assetExists){
    
        assetExists=new Assets({
            erc20asset : erc20Asset,
            lastscannedblock:lastscannedBlock
        })
        }
          
        saveAsset=await assetExists.save();
        console.log("saveAsset.erc20asset",saveAsset._id);

      for(let event in eventLog){

        eventLog[event].erc20asset=saveAsset._id;  
       
    //console.log(eventLog[event]);
         /*
            await new EventDetails(eventLog[event])
            .save()
            .catch((err)=>{
            console.log(err.message);
            }
            ); 
        */
        }        
}

module.exports = goscan;
