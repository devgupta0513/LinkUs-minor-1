const mongoose =  require('mongoose');
//data model of message
//contains three thing 1->name & id of sender,2->content,3->reference to chat it belogns to
const messageModel = mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        content:{type:String,trim:true},
        chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},

    },{
        timestamps:true,
    }
)


const Message =mongoose.model("Message",messageModel);
module.exports=Message;