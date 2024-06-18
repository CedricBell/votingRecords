const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const ccpPath = path.resolve(__dirname, 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

async function initGateway() {
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

    return gateway;
}

app.post('/addVoter', async (req, res) => {
    const { id, name, address, age } = req.body;
    const gateway = await initGateway();
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('votingChaincode');
    await contract.submitTransaction('AddVoter', id, name, address, age.toString());
    res.send('Voter added successfully');
});

app.post('/editVoter', async (req, res) => {
    const { id, name, address, age } = req.body;
    const gateway = await initGateway();
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('votingChaincode');
    await contract.submitTransaction('EditVoter', id, name, address, age.toString());
    res.send('Voter edited successfully');
});

app.post('/deleteVoter', async (req, res) => {
    const { id } = req.body;
    const gateway = await initGateway();
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('votingChaincode');
    await contract.submitTransaction('DeleteVoter', id);
    res.send('Voter deleted successfully');
});

app.get('/getVoter/:id', async (req, res) => {
    const { id } = req.params;
    const gateway = await initGateway();
    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('votingChaincode');
    const result = await contract.evaluateTransaction('GetVoter', id);
    res.send(result.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
