const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
'fox antenna ankle subject claim vintage visa exhaust lion legend lounge question',
'https://rinkeby.infura.io/v3/457d1362331a49758e4c67fae69f9716'
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from: ', accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
					.deploy({ data: compiledFactory.bytecode})
					.send({ from: accounts[0], gas: '1000000' });
	console.log('Contract deployed to: ', result.options.address);
};

deploy();

