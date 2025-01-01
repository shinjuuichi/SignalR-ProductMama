import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import { SignalRService } from 'service/SignalRService'

const Product = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		const connection = SignalRService.ProductHub
		connection.invoke('GetProduct')
		connection.on('ReceiveProducts', (products) => {
			setProducts(products)
		})
	}, [])

	return (
		<Table component={Paper} sx={{ width: '75%', mx: 'auto' }}>
			<TableHead>
				<TableRow>
					<TableCell width={'20%'}>Id</TableCell>
					<TableCell width={'20%'}>Name</TableCell>
					<TableCell width={'20%'}>Description</TableCell>
					<TableCell width={'20%'}>Price</TableCell>
					<TableCell width={'20%'}>Category</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{products.map((product) => (
					<TableRow>
						<TableCell>{product.id}</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.quantity}</TableCell>
						<TableCell>${product.price}</TableCell>
						<TableCell>{product.category.name}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

export default Product
