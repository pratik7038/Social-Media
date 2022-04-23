var commentButton = document.getElementById('comment-button')
var commentForm = document.getElementById('comment-form')
console.log("comment")

commentButton.onclick(function(){
    commentForm.style = {
        display: "block"
    }
})
