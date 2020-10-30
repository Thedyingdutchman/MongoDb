
let url = 'mongodb://localhost:27017/mongo_demo';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            console.log("Connected to the database")
            // List ALl entries
            // This function is going to the models and name_schema.js and returning all the data
            
            nameModel.find({})
                    .then((data)=> {
                        console.log(data)
                        res.send(data)
                        mongoose.connection.close()
                    })
                    .catch((connectionError)=>{
                        console.log(connectionError)
                        res.send("Fetch data Error")
                    })
            
        .catch((connectionError) => {
            console.log(connectionError)
        })

    })