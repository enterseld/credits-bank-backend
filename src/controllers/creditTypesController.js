import CreditType from "../models/CreditType.js";

export const addCreditType = async (req, res) => {
    const { name, conditions, interestRate, term } = req.body;

    try {
        const creditType = await CreditType.create({
            name: name,
            conditions: conditions,
            interestRate: interestRate,
            term: term
        });

        res.status(201).json({ message: "Credit type created", creditType: creditType._id })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export const createByConditions = async (req, res) => {
    const { conditions, interestRate, term } = req.body;

    try {
        const creditType = await CreditType.findOne({
            conditions: conditions,
            interestRate: interestRate,
            term: term
        });
        
        if (creditType) return res.status(201).json({ message: "Credit type found", creditType: creditType._id });
        const newCreditType = await CreditType.create({
            name: conditions + term,
            conditions: conditions,
            interestRate: interestRate,
            term: term
        });
        return res.status(201).json({ creditType: newCreditType._id });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}