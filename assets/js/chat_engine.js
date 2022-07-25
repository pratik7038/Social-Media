class ChatEngine{
    constructor(chatBoxId,userEmail){ 
        this.chatBoxId = $(`#${chatBoxId}`);
        this.userEmail = userEmail; 
        this.socket = io.connect('http://localhost:5000');
        
        if(this.userEmail){ 
            this.connectHandler();
        }
    }

    connectHandler(){  

        let self = this; 
        
        this.socket.on('connection', function(){  
            console.log('connection established using sockets')
            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatroom : 'codial'
            }) 

            self.socket.on('user_joined',function(data){
                console.log('a user joined : ',data)
            })
        })
    }
}