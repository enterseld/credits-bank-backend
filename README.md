### Backend
```bash
git clone https://github.com/enterseld/credits-bank-backend
cd .\credits-bank-backend\
```
```bash
npm install
```
Add .env file, inside add data for testing:
```bash
MONGO_URI=mongodb+srv://test_user:mypassword1234@bankcluster.94qfzgg.mongodb.net/?retryWrites=true&w=majority&appName=BankCluster
DB_NAME=myDB
PORT=5000
JWT_SECRET=0e28112e170194611719b8f738218a1a603e83f45e6cc8f533adad7ae5513928
```
```bash
npm run dev
```
