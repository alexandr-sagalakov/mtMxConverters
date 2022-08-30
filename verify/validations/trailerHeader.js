const trailerHeader = (str) => {
    const trailer = str;
    let mapOfTrailer = new Map();
    let reqString = divideBracket(trailer);

    function divideBracket(trailer) {
        let stack = [];
        let array = [];
        for (let i = 0; i < trailer.length; i++) {
            if (trailer[i] == "{" || trailer[i] == "}") {
                if (trailer[i] == "{") {
                    stack.push("{ " + i);
                } else {
                    let top = stack[stack.length - 1];
                    stack.pop();
                    if (stack.length === 0) {
                        let start = top.slice(2, top.length);
                        let startNum = parseInt(start, 10);
                        let string = trailer.slice(startNum + 1, i);
                        array.push(string);
                    }
                }
            }
        }
        return array;
    }

    for (let str of reqString) {
        mapOfTrailer.set(str.split(":")[0], str.split(":")[1]);
    }

    const verifyMAC = () => {
        if (mapOfTrailer.has("MAC")) {
            let MAC_address = mapOfTrailer.get("MAC");
            let regex = /[A-Z0-9]{8}/;
            let correctReg = regex.test(MAC_address);

            if (MAC_address.length != 8) {
                console.log("Invalid MAC length");
                return false;
            } else {
                if (!correctReg) {
                    console.log("Invalid Expression");
                    return false;
                }
               
            }
        }
        return true;
    };

    const verifyCHK = () => {
        let CHK_address = mapOfTrailer.get("CHK");
        let regex = /[A-Z0-9]{12}/;
        let correctReg = regex.test(CHK_address);

        if (CHK_address.length != 12) {
            console.log("Invalid CHK length");
            return false;
        } else {
            if (!correctReg) {
                console.log("Invalid Expression");
                return false;
            }
           
        }
        return true;
    };

    const verifyPDE = () => {
        let regex =
            /[0-9]{4}[0-9]{6}[A-Z]{4}[A-Z]{2}[0-9A-Z]{2}[0-9A-Z]{1}[0-9A-Z]{3}[0-9]{4}[0-9]{6}/;
        let PDE = mapOfTrailer.get("PDE");
        if (mapOfTrailer.has("PDE")) {
            let correctReg = regex.test(PDE);

            if (PDE.length != 32) {
                console.log("Invalid PDE Length");
                return false;
            } else {
                if (!correctReg) {
                    console.log("Invalid PDE Expression");
                    return false;
                }
                
            }
        }
        return true;
    };

    const verifyMRF = () => {
        let regex =
            /[0-9]{6}[0-9]{4}[0-9]{6}[A-Z]{4}[A-Z]{2}[0-9A-Z]{2}[0-9A-Z][0-9A-Z]{3}[0-9]{4}[0-9]{6}/;
        let MRF = mapOfTrailer.get("MRF");
        if (mapOfTrailer.has("MRF")) {
            let correctReg = regex.test(MRF);
            if (MRF.length != 38) {
                console.log("Invalid MRF Length");
                return false;
            } else {
                if (!correctReg) {
                    console.log("Invalid MRF Expression");
                    return false;
                }
              
            }
        }
        return true;
    };

    const verifyPDM = () => {
        let regex =
            /[0-9]{4}[0-9]{6}[A-Z]{4}[A-Z]{2}[0-9A-Z]{2}[0-9A-Z]{1}[0-9A-Z]{3}[0-9]{4}[0-9]{6}/;
        let PDM = mapOfTrailer.get("PDM");
        if (mapOfTrailer.has("PDM")) {
            let correctReg = regex.test(PDM);

            if (PDM.length != 32) {
                console.log("Invalid PDM Length");
                return false;
            } else {
                if (!correctReg) {
                    console.log("Invalid PDM Expression");
                    return false;
                }
                
            }
        }
        return true;
    };

    const verifySYS = () => {
        let regex =
            /[0-9]{4}[0-9]{6}[A-Z]{4}[A-Z]{2}[0-9A-Z]{2}[0-9A-Z]{1}[0-9A-Z]{3}[0-9]{4}[0-9]{6}/;
        let SYS = mapOfTrailer.get("SYS");
        if (mapOfTrailer.has("SYS")) {
            let correctReg = regex.test(SYS);

            if (SYS.length != 32) {
                console.log("Invalid SYS Length");
                return false;
            } else {
                if (!correctReg) {
                    console.log("Invalid SYS Expression");
                    return false;
                }
                
            }
        }
        return true;
    };

    let error = [];
    if (mapOfTrailer.has("CHK")) {
        if (!verifyCHK()) {
            error.push("false", "Error in CHK");
            return error;
        }
        if (!verifyMAC()) {
            error.push(false, "Error in MAC");
            return error;
        }
        if (!verifyPDE()) {
            error.push(false, "Error in PDE");
            return error;
        }
        if (!verifyMRF()) {
            error.push(false, "Error in NRF");
            return error;
        }
        if (!verifyPDM()) {
            error.push(false, "Error in PDM");
            return error;
        }
        if (!verifySYS()) {
            error.push(false, "Error in SYS");
            return error;
        }
        error.push(true, "Valid Trailer");
        return error;
    } else {
        error.push(false, "Missing Mandatory Field");
        return error;
    }
};

module.exports = trailerHeader;
