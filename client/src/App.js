
//import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import TabularDisplay from './components/TabularDisplay';
import DataInput from './components/DataInput';

class App extends Component  {

    constructor(props){
      super(props)
      
      this.state = {
        eventdetail: [],
        loading:true
      }

    }
  
   getData = async (erc20,user) => {

    const config ={
      headers:{
          'Content-Type':'application/json'
      }
  }

      const body = {erc20:erc20,user:user};
      alert(body.erc20 + body.user);
      const res = await axios.post('http://localhost:5000/api/fetchevent/scan',body, config);
      this.setState({loading:false, eventdetail: res.data})
  }

 render() {
      return (
              <div>
                <div><DataInput getData= {this.getData}/></div>
                <div><TabularDisplay eventdetail={this.state.eventdetail}/></div>
              </div>
            );
      }
}

export default App;

