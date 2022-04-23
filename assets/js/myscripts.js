var commentButton = document.getElementById('comment-button')
var commentForm = document.getElementById('comment-form')

commentButton.onclick(function(){
    console.log("comment")
    commentForm.style = {
        display: "block"
    }
})
