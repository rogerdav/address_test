'use strict';
var axios = require('axios');
var http = require('http');
var args = require('yargs').argv;
require('dotenv').load();

var parseString = require('xml2js').parseString;
const Address1 = args.add1;
let  Address2, City, State;
args.add2 ? Address2 = args.add2 : Address2 = '';
args.city ? City = args.city : City = '';
args.state ? State = args.state : State = '';

// console.log('args add1', Address1);
function getAddressVerification () {
  console.log('process env', process.env.USERID)
  return axios.get(`http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID="${process.env.USERID}">
  <Address>
  <Address1>${Address1}</Address1> 
  <Address2>${Address2}</Address2> 
  <City>${City}</City> 
  <State>${State}</State> 
  <Zip5></Zip5> 
  <Zip4></Zip4> 
  </Address> 
  
  </AddressValidateRequest>`)
  .then(res => {
    console.log(res.status);
    if (res.status === 200) {
      parseString(res. data, (err, result) => {
          console.dir(JSON.stringify(result));
          if (result.AddressValidateResponse.Address[0].Error)  {
            console.log('That is not a valid address the reason is: ', result.AddressValidateResponse.Address[0].Error[0].Description[0]) ;
            } else {
            console.log('That is a valid address, the zip code is: ', result.AddressValidateResponse.Address[0].Zip5[0])
            };
          
  
        });
    if (res.status != 200) {
      return new Error('Something went wrong please try again')
    }
    }
    
  })
  .catch(err => {
    console.error("In Catch Block", err);
    
  })
}
getAddressVerification();
