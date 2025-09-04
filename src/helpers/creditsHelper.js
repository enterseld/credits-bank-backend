import Credit from "../models/Credit.js"


export const updateCreditsInterest = async (condition) => {
    const credits = await Credit.find().populate({
        path: "creditType",
        match: {conditions: condition}
    });
    const filteredCredits = credits.filter(c => c.creditType !== null);
    for(const credit of filteredCredits){
        const rate = credit.creditType.interestRate;
        console.log(rate)
        console.log(credit.currentAmount)
        credit.currentAmount = credit.currentAmount * (1 + rate / 100);   
        console.log(credit.currentAmount)
        await credit.save();
    }
}
