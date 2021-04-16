export default(character) => {
    var val = character.charCodeAt();

    if(val <= 69)
    {
        return '#2196f3';
    }
    else if(val <= 74)
    {
        return '#aaaaaa';
    }
    else if(val <= 79)
    {
        return '#606060';
    }
    else if(val <= 84)
    {
        return '#b38df7';
    }
    else if(val <= 90){
        return '#00a4d3';
    }
};