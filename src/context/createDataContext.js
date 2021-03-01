import React, {useReducer} from 'react';

export default(reducer, actions, defaultValue) => {
    const Context = React.createContext();

    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, defaultValue);

    // call each function from our actions object
    const boundActions = {};

    for(let key in actions) {
        boundActions[key] = actions[key](dispatch);
    }
    return (
        // this makes all of our data available to the components rendered underneath it
        <Context.Provider value={{state, ...boundActions}} >
            {children}
        </Context.Provider>
    );
};
    return {Context, Provider};
};