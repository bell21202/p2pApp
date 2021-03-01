export const getPostRepliesById = (postId, posts) => {
    var replies = [];
    for(let p of posts){
        if(p.parentId == postId) {
            replies.push(p);
        }
    }
    return replies;
};