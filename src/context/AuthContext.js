import createDataContext from './createDataContext';
import app_API from '../api/app_API';
import {navigate} from '../navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
    switch(action.type) {
        case 'add_error':
            return {...state, errorMessage: action.payload};
        case 'signup':
            return {...state, email: action.payload.email, password: action.payload.password};
        case 'signin':
            var user = action.payload.user;
            // todo: research if better to pass in a user and not this long string of state variables
            return {errorMessage: '', email: user.email, firstname: user.firstname, lastname: user.lastname, memberType: user.memberType, cohortDate: user.cohortDate, isAdmin: user.isAdmin, userId: user._id};
        case 'clear_error_message':
            return{...state, errorMessage: ''};
        case 'signout':
            return {error: '', state: null};
        //case 'accountSave': // update picture maybe??
            //return {...state, errorMessage: ''};
        case 'accountSaveError':
            return {...state, errorMessage: action.payload};
        case 'submitPost':
            if(action.payload.hubType == 's'){
                return {...state, sPosts: action.payload.posts, adminPosts: action.payload.posts};
            } else if(action.payload.hubType == 'stm') {
                return {...state, cPosts: action.payload.posts, adminPosts: action.payload.posts};
            }
        case 'getPosts':
            if(action.payload.hubType == 's'){
                return {...state, sPosts: action.payload.posts}
            } else if(action.payload.hubType == 'stm') {
                return {...state, cPosts: action.payload.posts}
            }
        case 'getAdminPosts':
            return {...state, adminPosts: action.payload.posts}
        case 'getPostsError':
        case 'submitPostError':
        case 'getUsersError':
            return {...state, errorMessage: action.payload}
        case 'changePasswordError':
            return {...state, errorMessage: action.payload}
        case 'getUsers':
            return {...state, users: action.payload.users}
        case 'sendChat':
            var newMessage = action.payload.newMessage;
            return {...state, newMessagePub: newMessage}
        default:
            return state;
    }
};

/**** Authentication Scheme **********/
const tryLocalSignin = dispatch => async () => {
    try{
        token = await AsyncStorage.getItem('token') // todo_pp: should this string be unique?
        if(token) {
            const response = await app_API.post('/autoLogin');
            dispatch({type: 'signin', payload: response.data});
            navigate('mainFlow');
            return;
        }
    }
    catch(err){
        // todo_log: statement
    }
    navigate('initFlow');
};

const clearErrorMessage = dispatch => () => {
    dispatch({type: 'clear_error_message'});
};

const signup = dispatch => async ({email, password}) => {
    try{
        dispatch({type: 'signup', payload: {email, password}});
        navigate('CreateProfile');
    }
    catch(err)
    {
        // todo_log: statement
        dispatch({type: 'add_error', payload: 'Invalid password or email'})
    }
};

const signin = dispatch => async ({email, password}) => {
    try {
        const response = await app_API.post('/signin', {email, password});
        try{
            await AsyncStorage.setItem('token', response.data.token);
        }
        catch(err){
            // todo_log: statement
        }
        dispatch({type: 'signin', payload: response.data});
        navigate('mainFlow');
    }
    catch(err) {
        // todo_log: statement
        dispatch({type: 'add_error', payload: 'Invalid password or email'});
    }
};

const signout = (dispatch) => async () => {
    try {
        await AsyncStorage.removeItem('token');
        navigate('initFlow');
        dispatch({type: 'signout'}); // wipe out the state
    }
    catch(err){
        // todo_log statement
    }
};

const accountSave = (dispatch) => async (props) => {
    email = props.emailIn;
    password = props.password;
    firstname = props.firstnameIn;
    lastname = props.lastnameIn;
    memberType = props.memberTypeIn;
    cohortDate = props.cohortDateIn;
    userId = props.userId;

    try {
        const response = await app_API.post('/saveAccount', {email, password, firstname, lastname, memberType, cohortDate, userId});
        var token = await AsyncStorage.getItem('token');

        // check for token
        if(!token) {
            await AsyncStorage.setItem('token', response.data.token);
        }

        dispatch({type: 'signin', payload: response.data});
        navigate('mainFlow');
    }
    catch(err) {
        // todo_log: This occasionally fails for some reason.
        //dispatch({type: 'accountSaveError', payload: err});  // change this later??
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
        response.data.hubType = props.hubType;
        dispatch({type: 'submitPost', payload: response.data});
    }
    catch(err) {
        // todo_log: statement
        dispatch({type: 'submitPostError', payload: err});
    }
}

const getPosts = (dispatch) => async (props) => {
    try{  
        const response = await app_API.post('/getPosts', {"hubType" : props.hubType});
        response.data.hubType = props.hubType;
        dispatch({type: 'getPosts', payload: response.data})
    }
    catch(err) {
        // todo_log: statement
        dispatch({type: 'getPostsError', payload: err});
    }  
}

const getAdminPosts = (dispatch) => async () => {
    try{
        const response = await app_API.post('/getAdminPosts');
        dispatch({type: 'getAdminPosts', payload: response.data})
    }
    catch(err) {
        // todo_log: statement
        dispatch({type: 'getPostsError', payload: err});
    }
}

const getUsers = (dispatch) => async () => {
    try {
        const response = await app_API.post('/getUsers');
        dispatch({type: 'getUsers', payload: response.data})
    }
    catch(err) {
        // todo_log: statement
        dispatch({type: 'getUsersError', payload: err});
    }
}
/**** Chat Messaging Scheme **********/
const getUserChats = (dispatch) => async (props) => {
    try {
        const response = await app_API.post('/getUserChats');
        return response.data.chats;  // return directly
    }
    catch(err) {
        // todo_log: statement
        // dispatch({type: 'getChatsError', payload: err})
    }
}

const sendChat = (dispatch) => async (props) => {
    messageText = props.text;
    messageTo = props.to;

    try{
        const response = await app_API.post('/sendChat', {messageText, messageTo});

        // notify all "listeners" of the new message
        dispatch({type: 'sendChat', payload: response.data});
    }
    catch(err) {
        // todo_log: statement
        // dispatch({type: 'sendChatError', payload: err})
    }
}

const getChatHistory = (dispatch) => async (props) => {
    other = props.other;
    try{
        const response = await app_API.post('/getChatHistory', {other});
        return response.data.chatHistory;  // return directly
    }
    catch(err) {
        // todo_log: statement
        // dispatch({type: 'getChatHistoryError', payload: err});
    }
}

const setRead = (dispatch) => async (props) => {
    messages = props.messages;
    try{
        await app_API.post('/setRead', {messages});
    }
    catch(err) {
        // todo_log: statement
        // dispatch({type: 'setReadError', payload: err});
    }
}

export const {Provider, Context} = createDataContext(authReducer,
    {signin, signout, signup, clearErrorMessage, tryLocalSignin, accountSave, submitPost, getPosts, getAdminPosts, changePassword, getUsers, getUserChats, sendChat, getChatHistory, setRead},
     {errorMessage: '', email: '', password: '', firstname: '', lastname: '', memberType: '', isAdmin: false, cohortDate: null, sPosts: [], cPosts: [], adminPosts: [], users: [], userId: '', newMessagePub: null});


