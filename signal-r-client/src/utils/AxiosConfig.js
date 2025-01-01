import axios from 'axios'
import { Constraints } from './Constraints'

const AxiosConfig = axios.create({
	baseURL: Constraints.BASE_URL,
	headers: {
		'content-type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'X-Requested-With',
	},
})

AxiosConfig.interceptors.request.use(
	(request) => request,
	(error) => Promise.reject(error)
)

AxiosConfig.interceptors.response.use(
	(response) => response,
	(error) => error
)

export default AxiosConfig
