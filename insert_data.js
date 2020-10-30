
let url = 'mongodb://localhost:27017/mongo_demo';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=> {
            console.log("Connected to the database")
            let newData = new nameModel({id: 10, name: "Testing mongoose"});
            nameModel.insertMany(newData)
                    .then((data)=> {
                        console.log(data)
                        mongoose.connection.close()
                    })
                    .catch((connectionError)=>{
                        console.log(connectionError)
                    })
        })
        .catch((connectionError) => {
            console.log(connectionError)
        })
