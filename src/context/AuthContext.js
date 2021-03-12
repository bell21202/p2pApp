import createDataContext from './createDataContext';
import app_API from '../api/app_API';
import {navigate} from '../navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signin':
            var user = action.payload.user;
            var token = action.payload.token; // todo: research if better to pass in a user and not this long string of state variables
            return {errorMessage: '', email: user.email, firstname: user.firstname, lastname: user.lastname, memberType: user.memberType, cohortDate: user.cohortDate, isAdmin: user.isAdmin, token: token};
        case 'clear_error_message':
            return{...state, errorMessage: ''};
        case 'signout':
            return {token: null, error: ''};
        //case 'accountSave': // update picture maybe??
            //return {...state, errorMessage: ''};
        case 'accountSaveError':
            return {...state, errorMessage: action.payload};
        case 'submitPost':
            return {...state, posts: action.payload.posts, adminPosts: action.payload.posts};
        case 'getPosts':
            return {...state, posts: action.payload.posts}
        case 'getAdminPosts':
            return {...state, adminPosts: action.payload.posts}
        case 'getPostsError':
        case 'submitPostError':
            return {...state, errorMessage: action.payload}
        case 'changePasswordError':
            return {...state, errorMessage: action.payload}
        default:
            return state;
    }
};

// update token state here
const tryLocalSignin = dispatch => async () => {
    try{
        token = await AsyncStorage.getItem('token') // should this string be unique?
        if(token) {
            // todo: make a request to server to get current user!!
            dispatch({type: 'signin', payload: token});
        }
    }
    catch(err){
    }
    // token = token?
    navigate('mainFlow');
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'});
};

const signup = dispatch => async ({email, password}) => {
    try{
        const response = await app_API.post('/signup', {email,password});
        try{
            await AsyncStorage.setItem('token', response.data.token); 
        }
        catch(err){console.log("error setting token")};
        dispatch({type: 'signin', payload: response.data});
        navigate('CreateProfile');
    }
    catch(err)
    {
        console.log(err)
        dispatch({type: 'add_error', payload: 'Uh oh..something went wrong with signing up :('})
    }
};

const signin = dispatch => async ({email, password}) => {
    try {
        const response = await app_API.post('/signin', {email, password});
        try{
            await AsyncStorage.setItem('token', response.data.token);
        }
        catch(err){console.log("error setting token")}
        dispatch({type: 'signin', payload: response.data});
        navigate('mainFlow');
    }
    catch(err) {
        console.log(err)
        dispatch({type: 'add_error', payload: 'Uh oh..something went wrong with signing in'});
    }
};

const signout = (dispatch) => async () => {
    try {
        await AsyncStorage.removeItem('token');
    }
    catch(err){}
   
    // todo: do we want to show an error payload?
    dispatch({type: 'signout'});
    navigate('initFlow');
};

const accountSave = (dispatch) => async (props) => {
    email = props.emailIn;
    firstname = props.firstnameIn;
    lastname = props.lastnameIn;
    memberType = props.memberTypeIn;
    cohortDate = props.cohortDateIn;
    try {
        const response = await app_API.post('/saveAccount', {email, firstname, lastname, memberType, cohortDate});
        dispatch({type: 'signin', payload: response.data});
        navigate('mainFlow');
    }
    catch(err) {
        console.log(err);
        dispatch({type: 'accountSaveError', payload: err});  // change this later??
    }
}

const changePassword = (dispatch) => async (props) => {
    oldPass = props.oldPass;
    newPass = props.newPass;
    var navigation = props.navigation;

    try{
        await app_API.post('/changePassword', {oldPass, newPass});
        dispatch({type: 'clear_error_message'});
        if(navigation)
        {
            navigation.pop(); // navigate back to parent caller
        }
    }
    catch(err) {
        dispatch({type:'changePasswordError', payload: 'Password entered does not match your previous password.'});
    }
}

const submitPost = (dispatch) => async  (props) => {
    postText = props.value;
    hubType = props.hubType;
    firstname = props.firstname;
    lastname = props.lastname;
    parentId = props.parentId;
    isAdmin = props.isAdmin;

    try {
        const response = await app_API.post('/submitPost', {postText, hubType, firstname, lastname, parentId, isAdmin});
        dispatch({type: 'submitPost', payload: response.data});
    }
    catch(err) {
        console.log(err);
        dispatch({type: 'submitPostError', payload: err});
    }
}

const getPosts = (dispatch) => async (props) => {
    try{  
        const response = await app_API.post('/getPosts', {"hubType" : props.hubType});
        dispatch({type: 'getPosts', payload: response.data})
    }
    catch(err) {
        console.log(err);
        dispatch({type: 'getPostsError', payload: err});
    }  
}

const getAdminPosts = (dispatch) => async () => {
    try{
        const response = await app_API.post('/getAdminPosts');
        dispatch({type: 'getAdminPosts', payload: response.data})
    }
    catch(err) {
        console.log(err);
        dispatch({type: 'getPostsError', payload: err});
    }
}

export const {Provider, Context} = createDataContext(authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin, accountSave, submitPost, getPosts, getAdminPosts, changePassword},
     {token: null, errorMessage: '', email: '', password: '', firstname: '', lastname: '', memberType: '', isAdmin: false, cohortDate: null, posts: [], adminPosts: []});


