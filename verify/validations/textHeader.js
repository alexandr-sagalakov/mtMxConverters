const map = require('../conversion/mapVariables');
const fs = require('fs');



const textHeader = (str,filename) => {
  const string = str;
  console.log(str);
  let error = [];
  const array = string.split(":");

  const map1 = new Map();
  for (let i = 2; i < array.length; i += 2) {
    map1.set(array[i], array[i + 1]);
  }


  console.log(map1);

  if (
    !map1.has("20") &&
    !map1.has("23B") &&
    !map1.has("32A") &&
    !(map1.has("50A") || map1.has("50F") || map1.has("50K")) &&
    !(map1.has("59F") || map1.has("59A") || map1.has("59")) &&
    !map1.has("71A")
  ) {
    error.push(false);
    error.push("Mandatory reference is missing");
    return error;
  }
  let instrid=map1.get("20").replace(['\n'],'');
  if(instrid.length<16){
    error.push(false,"Error in length of 20");
    return error;
  }
   map.set('CdtTrfTxInfPmtIdInstrId',instrid.slice(0,16));
  //  console.log(map.get('CdtTrfTxInfPmtIdInstrId'));
  let lclIntr=map1.get("23B").replace(['\n'],'');

  if(lclIntr.length!==5){
    error.push(false,"Error in length of 23B");
    return error;
  }
  map.set('CdtTrfTxInfPmtTpInfLclInstrmPrtry',lclIntr.slice(0,4));
  let currency=map1.get("32A").slice(0,map1.get("32A").length-3);
  map.set('CdtTrfTxInfIntrBkSttlmAmtCcy',currency.slice(9,currency.length));

  if(map1.has("50A")){
    map.set('CdtTrfTxInfDbtrAcctPrxyId',map1.get("50A").replace(['\n'],''));
  }
  if(map1.has("50F")){
    let addrr=map1.get("50F").split('\n');
    console.log("Hello  "+addrr);
    map.set('CdtTrfTxInfDbtrCtctDtlsOthrId',addrr[0]);
    map.set('CdtTrfTxInfDbtrNm',addrr[1]);
    map.set('CdtTrfTxInfDbtrPstlAdrAdrLine',addrr[2]+" "+addrr[3]);
  }
  if(map1.has("50K")){
    let addrr=map1.get("50K").split('\n');
    console.log("Hello  "+addrr);
    map.set('CdtTrfTxInfDbtrCtctDtlsOthrId',addrr[0]);
    map.set('CdtTrfTxInfDbtrNm',addrr[1]);
    map.set('CdtTrfTxInfDbtrPstlAdrAdrLine',addrr[2]+" "+addrr[3]);

  }


  if(map1.has("59")){
    let OtherId = map1.get("59").split('\n')[0];
    let name = map1.get("59").split('\n')[1];
    map.set('CdtTrfTxInfCdtrNm',name);
    map.set('CdtTrfTxInfCdtrAcctPrxyId',OtherId);
  }
  if(map1.has("59A")){
    let idx=map1.get("59A").search(['\n']);
    
    map.set('CdtTrfTxInfCdtrCtctDtlsOthrId',map1.get("59A").slice(0,idx));
    // CdtrNm=;
    map.set('CdtTrfTxInfCdtrPstlAdrAdrLine',map1.get("59A").slice(idx+1,map1.get("59A").length));
    map.set('CdtTrfTxInfCdtrPstlAdrAdrLine',map.get('CdtTrfTxInfCdtrPstlAdrAdrLine').replace(['\n'],''));
  }
  if(map1.has("59F")){
    let idx=map1.get("59F").search(['\n']);
    map.set('CdtTrfTxInfCdtrCtctDtlsOthrId',map1.get("59F").slice(0,idx));
    map.set('CdtTrfTxInfCdtrPstlAdrAdrLine',map1.get("59F").slice(idx+1,map1.get("59F").length));
    map.set('CdtTrfTxInfCdtrPstlAdrAdrLine',map.get('CdtTrfTxInfCdtrPstlAdrAdrLine').replace(['\n'],''));
    // CdtrNm=;
  }

  let strings=map1.get("71A").slice(0,3);
  if(strings!=="BEN" && strings!=="OUR" && strings!=="SHA"){
    error.push(false,"Invalid 71A message");
    return error;
  }
  if(strings==="BEN"){
    map.set('CdtTrfTxInfDbtrNm',"DEBT");
  }


  fs.writeFile(`./${filename}.json`, JSON.stringify(Object.fromEntries(map)), err => {
     
    // Checking for errors
    if (err) throw err; 
   
    console.log("Done writing"); // Success
});
  error.push(true);
  error.push("Valid Text Header");
  return error;
};



module.exports = textHeader;