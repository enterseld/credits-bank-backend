import User from "../models/User.js";

export const getUser = async (req, res) => {
    const userId = req.user.id;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({message: "User not found"});
        return res.json(user);
    }catch(err){
        return res.status(500).json({error: err});
    }
}

export const updateUserProfile = async(req, res) => {
    const {name, ownershipType, address, phoneNumber, contactPerson} = req.body;
    const userId = req.user.id;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(400).json({message: "User not found"});
        user.name = name;
        user.ownershipType = ownershipType;
        user.address = address;
        user.phoneNumber = phoneNumber;
        user.contactPerson = contactPerson;
        await user.save();

    }catch(err){

    }
}