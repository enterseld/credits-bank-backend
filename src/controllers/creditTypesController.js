import CreditType from "../models/CreditType.js";

export const addCreditType = async (req, res) => {
    const { name, conditions, interestRate, term} = req.body;
    
    try{
        const creditType = await CreditType.create({
            name: name,
            conditions: conditions,
            interestRate: interestRate,
            term: term
            });

        res.status(201).json({message: "Credit type created", creditType: creditType._id})
    }catch(err){
        res.status(500).json({error: err.message});
    }
}