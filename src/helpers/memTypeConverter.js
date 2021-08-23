export default(type) => {
    // first time loggin in
    if (!type)
    {
        return {"tutor": false, "mentor": false, "scholar": false};
    }
    // loaded from db
    if (typeof type ==='string') {
        t = type.includes('1');
        m = type.includes('2');
        s = type.includes('3');
        return {"tutor": t, "mentor": m, "scholar": s};
    } else {
        // values being manipulated
        const {t, m, s} = type;
        var val = '';
        if(t)
        {
            val += '1';
        }
        if(m)
        {
            val += '2';
        }
        if(s) 
        {
            val += '3';
        }
        return val;
    }  
};

export const formatConverter = (type, mem) => {
    if(type.tutor)
    {
        mem.push("Tutor");
    }
    if(type.mentor)
    {
        mem.push("Mentor");
    }
    if(type.scholar)
    {
        mem.push("Scholar");
    }
};