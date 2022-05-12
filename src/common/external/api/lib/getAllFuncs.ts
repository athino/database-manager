

export const getAllFuncs = (toCheck: any) => {
    const props = [];
    let obj = toCheck;
    do {
        props.push(...Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));
    
    return props.filter((e, i, arr) => { 
       if (e!=arr[i+1] && typeof toCheck[e] == 'function') return true;
    }).filter((key) => {
        return !excludeList.includes(key)
    })
}

const excludeList = [
   '__defineGetter__',
   '__defineSetter__',
   '__lookupGetter__',
   '__lookupSetter__',
   'constructor',
   'hasOwnProperty',
   'isPrototypeOf',
   'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
]