import { HubConnectionBuilder } from '@microsoft/signalr'
import { Constraints } from 'utils/Constraints'

const createHubConnection = async (hubUrl) => {
	const connection = new HubConnectionBuilder()
		.withUrl(Constraints.BASE_URL + hubUrl)
		.withAutomaticReconnect()
		.build()
	await connection.start()

	return connection
}

export const SignalRService = {
	ProductHub: await createHubConnection('/productHub'),
	CategoryHub: await createHubConnection('/categoryHub'),
}
