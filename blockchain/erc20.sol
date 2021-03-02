pragma solidity >=0.4.22 <0.8.0;

 /*
      * This contract is a subset of the ERC20 standard, ONLY containing the definition of Transfer and Approval events,
        for the sake of the current application.

      * An 'abi' will be genereated from this contract,
        in order to properly communicate with any asset(contract) that implements the ERC20 standard. 
   */

contract ERC20 {
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}