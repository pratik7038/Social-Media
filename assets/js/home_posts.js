{
    ///method to submit the form data using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form')

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post)
                    $('#posts-list-container').prepend(newPost) 
                },
                error: function(error){
                    console.log(error.responseText)
                }
            })             
        })
    }

    ///method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post.id}">del</a>
        </small>
        ${post.content}
        <br>
        ${post.user}
        
        <br>
        <div class="post-comments">
            
                <form action="comments/create" method="post">
                    <input type="text" name="content" placeholder="Type comment here" required>
                    <input type="hidden" name="post" value="${ post._id }">
                    <input type="submit" value="add comment" >   
                </form>
            
        </div>
             
    </li>
    <ul id="comment-list" style="list-style: none">
        
    </ul>`)
    }




    createPost();


}