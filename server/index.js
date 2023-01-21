const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
let number = 0;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    
});


    
  


server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});


// ----------------------------------------------------------------------

var Pusher = require('pusher-client');
const { debug, count } = require("console");
const { json } = require("express");
const { emit } = require("process");

let itemList = [ ];

var minDiscount = 0;
var minPrice = 0.5;
var maxPrice = 20;


var pusher = new Pusher('c0eef4118084f8164bec65e6253bf195', {
    encrypted: true,
    wsPort: 443,
    wssPort: 443,
    host: 'notifier.bitskins.com'
});

pusher.connection.bind('connected', function() {
    // connected to realtime updates 
    console.log(" -- connected to websocket");
});

pusher.connection.bind('disconnected', function() {
    // not connected to realtime updates
        console.log(" -- disconnected from websocket");
});

var events_channel = pusher.subscribe('inventory_changes'); // use the relevant channel, see docs below




let totalItems = 0;


events_channel.bind('listed', function(data) {


totalItems = ++totalItems;

let json = JSON.stringify(data)
let result = JSON.parse(json)
let newItem = new Item(result);

//
 console.log('Sent')
//let matches = 0;
//for(let i = 0; i < itemList.length; i++){
//    if(itemList[i].name == newItem.name){
//        itemList[i].quantity == ++itemList[i].quantity;
//        matches = ++matches;
//        break;
//    }
//}
//
//if(matches == 0){
    itemList.push(newItem)
//} 

let tempList = itemList;
tempList.reverse();

io.sockets.emit('recieve_item', tempList);
    
});



class Item {
    //  app_id: '440',
    //  context_id: '2',
    //  item_id: '12393128783BSL2845372979',
    //  asset_id: '12393128783',
    //  class_id: '101785959',
    
    //  instance_id: '11040578',
    //  phase: null,
    //  image: 'https://steamcommunity-a.akamaihd.net/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEAaR4uURrwvz0N252yVaDVWrRTno9m4ccG2GNqxlQoZrC2aG9hcVGUWflbX_drrVu5UGki5sAij6tOtQ/257fx257f',
    //  market_hash_name: 'Mann Co. Supply Crate Key',
    //  price: '2.19',
    //  discount: '0',
    //  withdrawable_at: 1669924745,
    //  event_type: 'listed',
    //  broadcasted_at: 1674297161.80853

    

    constructor(_item){

        this.name = _item.market_hash_name;
        this.price = _item.price;
        this.image = _item.image;
    }
}




const myTimeout = setTimeout(timedCount, 1000);
let t = 0;

function timedCount()
{

t = ++t;


//console.clear();

//console.log( 'Time elapsed' , t )

//console.log( 'Total items' , totalItems  , '\n')



//for(let i = 0; i < itemList.length; i++)
//{
//
//    console.log(  itemList[i].quantity , ')' ,  itemList[i].name  )
//
//}






io.sockets.emit('receive_message', 'Server time | ' + t + 's');

setTimeout(timedCount, 1000);
}

