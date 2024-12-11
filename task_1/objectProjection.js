
function projectObject(src, proto) {

    if (!src || typeof src !== 'object' || !proto || typeof proto !== 'object') {
        return null;
    }

    const result = {};
    
    for (const key in proto) {
        
        if (!(key in src)) {
            continue;
        }

        if (proto[key] !== null && typeof proto[key] === 'object') {
            const projectedValue = projectObject(src[key], proto[key]);
            if (projectedValue !== null) {
                result[key] = projectedValue;
            }
        } else {
            result[key] = structuredClone(src[key]);
        }
    }

    return result;
}

const src = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: 31,
            prop32: 32
        }
    },
    prop12: 12
};

const proto = {
    prop11: {
        prop22: null
    }
};

const result = projectObject(src, proto);

console.log('Result:', JSON.stringify(result, null, 2));