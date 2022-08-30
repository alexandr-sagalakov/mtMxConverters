const applicationHeaderVer=(str)=>{
    const appInput=str;
    function input_format(appInput) {
        let error=[];
        if (appInput.length < 18 || appInput.length > 23) {
            error.push(false,"Invalid Length in application header");
            return error;
        } else {
          let regex = /[2]{1}[:]{1}(I103)[0-9A-Z]{12}[A-Z]{1}[0-9]{1}[0-9]{3}/;
          let correctExp = regex.test(appInput);
      
          if (!correctExp) {
            error.push(false,"Invalid Expression in application header");
            return error;
          } else {
            if (appInput[0] === "2") {
              if (appInput[1] === ":") {
                if (appInput[2] != "I") {
                    error.push(false,"Invalid Input in application header");
                    return error;
                } else {
                  let str = appInput.slice(3, 6);
                  if (str === "103") {
                    if (appInput[18] === "N") {
                      if (appInput[19] != "2") {
                        error.push(false,"Invalid Priority");
                        return error;
                      } else {
                        obsolescence = appInput.slice(20, 23);
                        if (obsolescence != "020") {
                            error.push(false,"Invalid Obsolescene Period in application header");
                            return error;
                        }
                      }
                    } else if (appInput[18] === "U") {
                      if (appInput[19] != "1" && appInput[19] != "3") {
                        error.push(false,"Invalid Priority in application header");
                        return error;
                      } else {
                        obsolescence = appInput.slice(20, 23);
                        if (obsolescence != "003") {
                            error.push(false,"Invalid Obsolescene Period in application header");
                            return error;
                        }
                      }
                    } else if (
                      appInput[18] != "S" ||
                      appInput[18] != "U" ||
                      appInput[18] != "N"
                    ) {
                        error.push(false,"Invalid Priority in application header");
                        return error;
                    }
                  } else {
                    error.push(false,"It is NOT MT103 format in application header");
                    return error;
                  }
                }
              } else {
                error.push(false,"Colon Mising in application header");
                return error;
              }
            } else {
                error.push(false,"Invalid Block Identifier in application header");
                return error;
            }
          }
        }
        error.push(true);
        error.push("Valid Application header");
        return error;
      }
      
      function output_format(appOutput) {
        let error=[];
        if (appOutput.length < 48 || appOutput.length > 49) {
            error.push(false,"Invalid Length in application header");
            return error;
        } else {
          let regex = /[2]{1}[:]{1}(O103)[0-9]{4}[0-9]{6}[A-Z]{4}[A-Z]{2}[0-9A-Z]{2}[0-9A-Z]{1}[0-9A-Z]{3}[0-9]{4}[0-9]{6}[0-9]{6}[0-9]{4}[A-Z]{1}/;
          let correctExp = regex.test(appOutput);
          if (!correctExp) {
            error.push(false,"Invalid Expression in application header");
            return error;
          } else {
            let hour_iptime = Number(appOutput.slice(6, 8));
            if (hour_iptime > 23) {
                error.push(false,"Invalid Hour Time in application header");
            return error;
            }
            let minute_iptime = Number(appOutput.slice(8, 10));
            if (minute_iptime > 60) {
                error.push(false,"Invalid Minute Time in application header");
                return error;
            }
      
            //MIR
            let month = Number(appOutput.slice(12, 14));
            if (month === 00 || month > 12) {
              error.push(false,"Invalid month in application header");
              return error;
            }
            let date = Number(appOutput.slice(14, 16));
            if (date > 31) {
                error.push(false,"Invalid date in application header");
                return error;
            }
      
            //Output Date
            let opmonth = Number(appOutput.slice(40, 42));
            if (opmonth > 12) {
                error.push(false,"Invalid Month in application header");
                return error;
            }
            let opdate = Number(appOutput.slice(42, 44));
            if (opdate > 31) {
                error.push(false,"Invalid Output Date in application header");
              return error;
            }
      
            //output Time
            let hour_optime = Number(appOutput.slice(44, 46));
            if (hour_optime > 23) {
                error.push(false,"Invalid Output Hour Time in application header");
                return error;
            }
            let minute_optime = Number(appOutput.slice(46, 48));
            if (minute_optime > 60) {
                error.push(false,"Invalid Input Minute Time in application header");
                return error;
            }
            let priority = appOutput.slice(48, 49);
            if (priority != "S" && priority != "N" && priority != "U") {
                error.push(false,"Invalid priority in application header");
              return error;
            }
          }
        }
        error.push(true);
        error.push("Valid Application header");
        return error;
      }
      
      if (appInput[2] === "I") {
        return input_format(appInput);
      }
      else {
        return output_format(appInput);
      }     
}


module.exports=applicationHeaderVer;