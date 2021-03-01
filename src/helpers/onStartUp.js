import React, {useEffect, useContext} from 'react';
import {Context as AuthContext} from '../context/AuthContext';

const onStartUp = () => {
    const {getPosts} = useContext(AuthContext);

    useEffect(() => {
        getPosts();
    }, []);

    return null; // show nothing
}

export default onStartUp;