export function parse(text: string, value: any){
    let startDelimeter = '{';
    let endDelimeter = '}';
    let startIndex = 0;
    let endIndex = 1;
    let finalString = "";
    while(endIndex < text.length){
        if(text[startIndex] === startDelimeter){
            while(text[endIndex] !== endDelimeter){
                endIndex++;
            }
            let valueObtained = text.slice(startIndex+1, endIndex);
            const keys = valueObtained.split(".");
            let localValues = {
                ...value
            }
            for(let i=0; i<keys.length; i++){
                if(typeof localValues === "string"){
                    localValues = JSON.parse(localValues);
                }
                localValues = localValues[keys[i]];
            }
            finalString += localValues;
            startIndex = endIndex + 1;
            endIndex++;

        }else{
            finalString += text[startIndex]
            startIndex++;
            endIndex++;

        }
    }
    return finalString;
}