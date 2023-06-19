const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./UserSchema');
const bcrypt = require('bcrypt')

const app = express();
app.use(cors());
app.use(express.json());

// const url = "mongodb://127.0.0.1:27017/shivaSolution";
const url = 'mongodb+srv://manohar72singh:manoharsingh@cluster0.b8i7lql.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url).then((value) => {
    console.log("Sucessfully connected to database");
}).catch((error) => {
    console.log("Error connecting to database", err)
})


app.post('/register', async (req, res) => {
    const body = req.body;

    try {
        if (!(!body.name || !body.username || !body.email || !body.phoneNumber || !body.designation || !body.pincode || !body.state || !body.city || !body.district || !body.password)) {
            res.status(404).json({ message: "All Fields Are required" });
            return;
        }
        const emailExits = await userModel.findOne({ email: body.email })
        const usernameexits = await userModel.findOne({ username: body.username })
        const phonenumberExits = await userModel.findOne({ phoneNumber: body.phoneNumber })
        if (emailExits) {
            res.status(404).json({ message: "Email already exists", status: false });
            return;
        }
        if (usernameexits) {
            res.status(404).json({ message: "username already exists", status: false });
            return;
        }
        if (phonenumberExits) {
            res.status(404).json({ message: "Phonenumber already exists", status: false });
            return;
        }
        
        body.password = await bcrypt.hash(body.password, 6);
            const savedata = await userModel.create(body);
            res.status(201).json({ message: "Registration successfilly", data: savedata, status: true })
            return;
        
    } catch (error) {
        console.log("Registraion error is =" ,  error)        
    }



})

app.post('/login', async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        if ((!body.username || !body.password)) {
            res.status(404).json({ message: "Login data is invallid", status: false })
            return;
        }
        const userExits = await userModel.findOne({
            $or: [
                { username: body.username },
                { email: body.username },
                { phoneNumber: body.username }
            ]
        })
        if (!userExits) {
            res.status(404).json({ message: "userNot foun" })
            return;
        }
        const isPasswordMatch = await bcrypt.compare(body.password, userExits.password)
        if (!isPasswordMatch) {
            res.status(404).json({ message: "Username/Password is incorrect", status: false })
            return;
        }
        res.status(200).json({ message: "user found successfuly", status: true })
    } catch (e) {
        console.log("error", e);
    }
})

app.get('/home', (req, res) => {
    res.json({ message: "Get Home Data" })
})

app.listen(2610, (err) => {
    if (err) console.log("error is ", err);
    console.log("server is live ")
})
