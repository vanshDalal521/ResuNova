const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("Connected to MongoDB!");
    // Querying the users collection
    const users = await mongoose.connection.db.collection('users').find({}).toArray();
    console.log("Users in DB:", users.map(u => ({ email: u.email, username: u.username })));
    mongoose.connection.close();
})
.catch(err => console.error("Error:", err));
