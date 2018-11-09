'use strict';

var http = require('http');

// var parseString = require('xml2js').parseString;
// var xml = '<?xml version="1.0" encoding="UTF-8" ?><business><company>Code Blog</company><owner>Nic Raboy</owner><employee><firstname>Nic</firstname><lastname>Raboy</lastname></employee><employee><firstname>Maria</firstname><lastname>Campos</lastname></employee></business>';
// parseString(xml, function (err, result) {
//     console.dir(JSON.stringify(result));
// });
function getAddressVerification () {

  return http.get(`http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=<AddressValidateRequest USERID="593PRIVA4382">
  <Address>
  <Address1></Address1> 
  <Address2>6406 Ivy Lane</Address2> 
  <City>Greenbelt</City> 
  <State>MD</State> 
  <Zip5></Zip5> 
  <Zip4></Zip4> 
  </Address> 
  
  </AddressValidateRequest>`, 
  res => {
    
    console.log(res);
  });
}
getAddressVerification();
