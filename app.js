import express from 'express';
import __dirname from './__dirname.js';
import mongodb, {ObjectId} from 'mongodb';
import { json } from 'stream/consumers';

let app = express();
app.use(express.json()) 
var search_querry1, search_querry2, search_querry;

async function connection(){
    try{
        const mongoClient = new mongodb.MongoClient("mongodb://127.0.0.1/:27017");
        await mongoClient.connect();

        console.log('Connection succesful');

        let db = mongoClient.db('p3v').collection('users');
        var obj = await db.find().project().toArray();

        app.get('/', function(req, res) {
            res.sendFile(__dirname + '/dir/page.html');
        });
        app.use(express.static(__dirname + '/dir/'))
        
        app.post('/api/user/', async function(req,res){
            let user = req.body;
            console.log(user);
            await db.insertOne(user);

            res.json(user)
        })
        
        app.get('/api/get/users/', async function(req, res) {     
            let users = await db.find().toArray();   
            res.json(users);
        });

        app.post('/api/userDelete/', async function(req, res){
            let delete_user_req = req.body;

            console.log({id_: new ObjectId(delete_user_req._id)})
            await db.deleteOne({_id: new ObjectId(delete_user_req._id)});
            
        });

        app.post('/api/userEdit/', async function(req, res){
            let edit_user_req = req.body;

            console.log(edit_user_req.name)

            await db.updateOne({_id: new ObjectId(edit_user_req._id)}, {$set: {surname:edit_user_req.surname}}); 
            await db.updateOne({_id: new ObjectId(edit_user_req._id)}, {$set: {name:edit_user_req.name}});
            
        });

        app.get('/api/get/search/', async function(req, res) {
            res.json(search_querry)

        });

        app.post('/api/search/', async function(req, res){
            let search_req = req.body;
            let search_req_otdelno = search_req.inputSearch.split(' ')
            console.log(search_req.inputSearch)

            search_querry1 = await db.find({ $or: [{name:search_req.inputSearch},{surname:search_req.inputSearch}]}).toArray();
            search_querry2 = await db.find({name:search_req_otdelno[0], surname:search_req_otdelno[1]}).toArray();

            if(search_querry2 == 0){
                search_querry = search_querry1;
                console.log('!!!');
            }else{
                search_querry = search_querry2;
            }
            // search_querry = {search_querry1, search_querry2}

            console.log(search_querry, search_querry1, search_querry2);
        });
          
        app.listen(3000, function() {
            console.log('running');
        });
    }catch(error){
        console.log('Error! '+ error);
    }
}
connection();

