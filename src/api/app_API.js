import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const instance = axios.create({
    baseURL: 'http://0e386068a84b.ngrok.io'
    
});

// append our token to every request
instance.interceptors.request.use(
    async (config) => {

        // we don't have a token yet..
        if(config.url.includes('signup') || config.url.includes('signin')) {
            return config;
        }
        const token = await AsyncStorage.getItem('token');
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    
    // error case
    (err) => {
        return Promise.reject(err);
    }
);
    
export default instance;