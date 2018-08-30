import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import campaignContract from '../../../etherium/campaign';

class RequestIndex extends Component {

	static async getInitialProps(props) {
		const { address } = props.query;
		const campaign = campaignContract(address);
		const requestCount = await campaign.methods.getRequestCount().call();
		const approversCount = await campaign.methods.approversCount().call();

		const requests = await Promise.all(
			Array(parseInt(requestCount)).fill().map((element, index) => {
				return campaign.methods.requests(index).call();
			})
		);

		return { campaign, address, requests, approversCount };
	}

	renderRows() {
		return this.props.requests.map((request, index) => {
			return <RequestRow 
				key={index}
				id={index}
				request={request}
				address={this.props.address}
				approversCount={this.props.approversCount}
			/>
		});
	}

	render() {
		const { HeaderCell, Row, Body, Header} = Table;
		return (
			<Layout>
				<h3>Request</h3>
				<Link route={`/campaigns/${this.props.address}/requests/new`}>
					<a>
						<Button primary floated="right" style={{ marginBottom: '10px'}}>Add Request</Button>
					</a>
				</Link>
				<Table>
					<Header>
						<Row>
							<HeaderCell>ID</HeaderCell>
							<HeaderCell>Description</HeaderCell>
							<HeaderCell>Amount</HeaderCell>
							<HeaderCell>Recipient</HeaderCell>
							<HeaderCell>Approval Count</HeaderCell>
							<HeaderCell>Approve</HeaderCell>
							<HeaderCell>Finalize</HeaderCell>
						</Row>
					</Header>
					<Body>
						{this.renderRows()}
					</Body>
				</Table>
			</Layout>
		);
	}
}

export default RequestIndex;
