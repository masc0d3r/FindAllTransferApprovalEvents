import React, { Component } from 'react'
//import axios from 'axios';
import ReactTable from "react-table"; 
import 'react-table/react-table.css'

export default class TabularDisplay extends Component {


    
  render() {
    const columns = [{  
      Header: 'Address',  
      accessor: 'address',
     }
     ,{  
      Header: 'BlockHash',  
      accessor: 'blockHash' ,
      }
     
     ,{  
     Header: 'BlockNumber',  
     accessor: 'blockNumber' ,
     }
     ,{  
     Header: 'LogIndex',  
     accessor: 'logIndex',
     },
     {  
      Header: 'TransactionHash',  
      accessor: 'transactionHash',
      },
      {  
      Header: 'TransactionIndex',  
      accessor: 'transactionIndex',
      },
      {  
      Header: 'Event',  
      accessor: 'event',
      },
      {
      Header: 'Signature',  
      accessor: 'signature',
      }
  ]
    return (
      <ReactTable  
      data={this.props.eventdetail}
      columns={columns}  
   />
    )
  }
}