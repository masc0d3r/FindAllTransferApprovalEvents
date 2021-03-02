import React, { Component } from 'react'


class DataInput extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

         <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let erc20Asset,user
                erc20Asset = this.input1.value.toString()
                user = this.input2.value.toString()
                this.props.getData(erc20Asset,user);
               
              }}>
              <div>
                <label className="float-left"><b>ERC-20 Asset Address</b></label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input1 = input }}
                  className="form-control form-control-lg"
                  placeholder="0x"
                  required />
              </div>

              <div>
                <label className="float-left"><b>User Account Address</b></label>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input2 = input }}
                  className="form-control form-control-lg"
                  placeholder="0x"
                  required />
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">Search Transfer and Approval Events</button>
            </form>
           
          </div>
        </div>

      </div>
    );
  }
}

export default DataInput;
