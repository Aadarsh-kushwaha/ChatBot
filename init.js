const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

main()
.then(()=>{
    console.log("Connections Suceessful");
})
.catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
}

let allChats = [
    {
        from:"Students",
        to:"Professor",
        msg:"Hello Sir",
        created_at: new Date(),
    },
    {
        from:"Professor",
        to:"Students",
        msg:"Hlw, What can i do for you?",
        created_at: new Date(),
    },
    {
        from:"Students",
        to:"Professor",
        msg:"I have a doubt ",
        created_at: new Date(),
    },
    {
        from:"Professor",
        to:"Students",
        msg:"Go ahead,ask",
        created_at: new Date(),
    }
    
    ];
Chat.insertMany(allChats);
