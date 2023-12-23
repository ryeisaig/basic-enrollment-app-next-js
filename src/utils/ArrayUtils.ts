export const getChunks = (arr: any[], size: number) => {
    const res = [];
    for (let i = 0; i < arr.length; i += size) {
        const chunk = arr.slice(i, i + size);
        res.push(chunk);
    }
    return res;
}

export const getColumnChunks = (arr: any[], size: number) => {
    const res = [];
    let i = 0;
    while(i < arr.length){
        if(arr[i]?.full){
            res.push([arr[i]]);
            i++;
            continue;
        }
        const chunk = arr.slice(i, i + size);
        res.push(chunk);
        i += size;
    }
    return res;
}