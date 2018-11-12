'use strict';
var axios = require('axios');
var http = require('http');
require('dotenv').load();

var parseString = require('xml2js').parseString;
// var xml = '<?xml version="1.0" encoding="UTF-8" ?><business><company>Code Blog</company><owner>Nic Raboy</owner><employee><firstname>Nic</firstname><lastname>Raboy</lastname></employee><employee><firstname>Maria</firstname><lastname>Campos</lastname></employee></business>';
// parseString(xml, function (err, result) {
//     console.dir(JSON.stringify(result));
// });
function getAddressVerification () {
  console.log('process env', process.env.USERID)
  axios.get(`http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID="${process.env.USERID}">
  <Address>
  <Address1>6406 Ivy Lane</Address1> 
  <Address2></Address2> 
  <City>Greenbelt</City> 
  <State>MD</State> 
  <Zip5></Zip5> 
  <Zip4></Zip4> 
  </Address> 
  
  </AddressValidateRequest>`)
  .then(res => {
    console.log(res.data);
    parseString(res. data, (err, result) => {
      console.dir(JSON.stringify(result));
      console.log("result   :", result.AddressValidateResponse.Address[0].Zip5[0]);
    })
  })
  .catch(err => {
    console.error(err);
  })
}
getAddressVerification();
