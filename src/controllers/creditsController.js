import Credit from "../models/Credit.js";
import CreditType from "../models/CreditType.js";
import User from "../models/User.js"

export const getAllByUser = async (req, res) => {
    const userId = req.user.id;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "User not found"});

        const credits = await Credit.find({userId: userId}).populate('creditType');
        return res.json({data: credits});
    }catch(err){
        return res.status(500).json({error: err});
    } 
}

export const addCredit = async (req, res) => {
    let { creditTypeId, startingAmount} = req.body;
    const userId = req.user.id;
    creditTypeId = creditTypeId.creditType;
    try{
        const credit = await Credit.create({
            creditType: creditTypeId,
            userId: userId,
            startingAmount: startingAmount,
            currentAmount: startingAmount
            });
        res.status(201).json({message: "credit created", credit: credit._id})
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const updateCredit = async (req, res) => {
    const {creditId, newAmount} = req.body;
    const userId = req.user.id;
    try{
        const credit = await Credit.findById(creditId);
        if (!credit) {
            throw new Error(`Credit with id ${creditId} not found`);
        }
        if (!credit.userId.equals(userId)) {
            throw new Error(`Credit does not match user`);
        }
        credit.currentAmount = credit.currentAmount - newAmount;
        await credit.save();
        res.status(201).json({message: "credit updated", credit: credit._id})
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

export const deleteCredit = async (req, res) => {
    const { creditId, isPaid} = req.body;
    const userId = req.user.id;
    
    try{
        const credit = await Credit.findById(creditId);
        if (!credit) {
            throw new Error(`Credit with id ${creditId} not found`);
        }
        if (!credit.userId.equals(userId)) {
            
            throw new Error(`Credit does not match user`);
        }
        if(isPaid) {
            const result = await Credit.findByIdAndDelete(creditId);
        }
        else{
            throw new Error(`Credit with id ${creditId} not removed`);
        }
        res.status(201).json({message: "Credit removed", credit: credit._id})
    }catch(err){
        res.status(500).json({error: err.message});
    }
}

