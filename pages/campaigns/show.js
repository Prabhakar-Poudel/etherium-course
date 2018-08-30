import React, { Component } from 'react';
import { Card, Button, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import campaignContract from '../../etherium/campaign';
import web3 from '../../etherium/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {

	static async getInitialProps(props) {
		const campaign = campaignContract(props.query.address);
		const summary = await campaign.methods.getSummary().call();

		return {
			minimumContribution: summary[0],
			balance: summary[1],
			requestCount: summary[2],
			approversCount: summary[3],
			manager: summary[4],
			address: props.query.address
		};
	}

	renderCards = () => {
		const { balance, minimumContribution, requestCount, approversCount, manager } = this.props;
		const items = [
			{
				header: manager,
				meta: 'Address of manager',
				description: 'The manager created this campaign and can withdraw money'
			},
			{
				header: minimumContribution,
				meta: 'Minimum Contribution (wei)',
				description: 'You must contribute at least this much wei to become a menmber.'
			},
			{
				header: requestCount,
				description: 'A request tries to withdraw money from the contract. A request must be approved by contributors.',
				meta: 'Number of requests'
			},
			{
				header: approversCount,
				description: 'Count of people who have donated to this campaign. Contributers can approve requests.',
				meta: 'Number of Contributers'
			},
			{
				header: web3.utils.fromWei(balance, 'ether'),
				description: 'Amount of balance in ether this contract has.',
				meta: 'Campaign Balance (ether)'
			}
		];

		return <Card.Group items={items} style={{overflowWrap: 'break-word'}}/>
	}

	render() {
		return (
			<Layout>
				<h3>{this.props.address}</h3>
				<Grid>
					<Grid.Row>
						<Grid.Column width={10}>
							{this.renderCards()}
						</Grid.Column>
						<Grid.Column width={6}>
							<ContributeForm address={this.props.address}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<Link route={`/campaigns/${this.props.address}/requests`}>
								<a>
									<Button primary>View Requests</Button>
								</a>
							</Link>
						</Grid.Column>

					</Grid.Row>
				</Grid>
			</Layout>
		);
	}
}
export default CampaignShow;

