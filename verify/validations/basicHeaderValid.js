"use strict";

const basicHeaderVer = (str) => {
  const basic_header = str;
  let error=[];
  if (basic_header.length == 27) {
    let regex =
      /[1]{1}[:]{1}[FAL]{1}(01||21)[A-Z]{4}[A-Z]{2}[0-9A-Z]{2}[0-9A-Z][0-9A-Z]{3}[0-9]{4}[0-9]{6}/;

    if (!regex.test(basic_header)) {
        error.push(false);
        error.push("Basic Header Format Incorrect")
      return error;
    }
    else{
        error.push(true);
        error.push("Valid Basic Header");
        return error;
    }
  } else {
    error.push(false);
    error.push("Invalid Header Length")
    return error;
  }

  let blockStartChar = `${basic_header[0]}${basic_header[1]}${basic_header[2]}`;
  let appId = basic_header[3];
  let serviceId = basic_header.slice(4, 6);
  let LTaddress = basic_header.slice(6, 18);
  let sessNo = basic_header.slice(18, 22);
  let seqNo = basic_header.slice(22, 28);
  let closed = basic_header[28];
};

module.exports = basicHeaderVer;
