import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x4ccddf8e7edd7c99cf982dbf3400c23294a44781'
);

export default instance;
