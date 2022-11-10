const yargs = require("yargs");
const {client,connect} = require("./db/connections");
const Movie = require("./utils/index");

async function app (yargsObject) {
    const movieCollection = await connect();
    if (yargsObject.create) {
        console.log("entering Add functionality")
        const newMovie = new Movie(yargsObject.title, yargsObject.actor, yargsObject.director);
        await newMovie.add(movieCollection);
        // code to add a movie
    } else if (yargsObject.read) {
        console.log("entering read functionality")
        const results = await movieCollection.find({}).toArray();
        console.table (results);
        // code to read the Movie document
    } else if (yargsObject.update) {
        console.log("entering update functionality")
        // OPTION 1
        // --------
        // const searchObj = new Movie(yargsObject.title,yargsObject.actor, yargsObject.director);
        // const updateObj = {actor: yargsObject.newActor};
        // await searchObj.update(movieCollection, updateObj);

        //OPTION 2
        //--------
        await movieCollection.updateOne({title: yargsObject.title}, {$set: {actor: yargsObject.actor}})
        // code to update a record in the Movie document
    } else if (yargsObject.delete) {
        console.log("entering delete functionality");
        // OPTION 1
        // --------
        // const deleteObject = new Movie (yargsObject.title, yargsObject.actor, yargsObject.director);
        // await deleteObject.delete(movieCollection);
        // code to delete a movie

        // OPTION 2
        // --------

        await movieCollection.deleteOne({title: yargsObject.title});
        
    } else {
        console.log("Command not recognised");
    };
    await client.close();
};

app(yargs.argv);