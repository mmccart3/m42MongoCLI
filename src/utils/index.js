class Movie {
    constructor(title, actor="Not specified", director="Not Specified") {
        this.title = title;
        this.actor = actor;
        this.director = director;
    };
    async add(movieCollection) {
        console.log("Entering add within index.js");
        // code to log a film to the database
        await movieCollection.insertOne(this);
    };
    async update(movieCollection, updateObj) {
        console.log("entering update in index")
        await movieCollection.updateOne(this, {$set: updateObj});
    }
    async delete(movieCollection) {
        console.log("entering delete in index")
        await movieCollection.deleteOne(this);
    }
};

module.exports = Movie;