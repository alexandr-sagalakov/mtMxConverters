const userHeaderVer=(str)=>{
    const userHeader=str;
	let stack = [];
    let array=[];
	for(let i = 0; i < userHeader.length; i++)
	{
        if(userHeader[i]=='{' || userHeader[i]=='}'){
            if(userHeader[i]=='{'){
                stack.push('{ '+i);
            }
            else{
                let top=stack[stack.length-1];
                stack.pop();
                if(stack.length===0){
                    let start=top.slice(2,top.length);
                    let startNum=parseInt(start,10);
                    let string=userHeader.slice(startNum+1,i);
                    array.push(string);     
                }
            }
        }		
	}
    
    const map1=new Map();
    for(let str of array){
        map1.set(str.split(':')[0],str.split(':')[1]);
    }
    
    // console.log(userHeaderMap);
    // console.log(reqString);

    let error=[];
//Added Fin copy 
    if(!map1.has("103")){
        error.push(false);
        error.push("Service Identifier is not 103");
        return error;
    }
    if(!map1.has("121")){
        error.push(false);
        error.push("Unique end-to-end transaction reference is missing");
        return error;
    }
    error.push(true,"Ready to Go Ahead");
    return error;
}
module.exports=userHeaderVer;