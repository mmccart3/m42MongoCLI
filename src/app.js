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
        // code to update a record in the Movie document
    } else if (yargsObject.delete) {
        console.log("entering delete functionality")
        // code to delete a movie
    } else {
        console.log("Command not recognised");
    };
    await client.close();
};

app(yargs.argv);