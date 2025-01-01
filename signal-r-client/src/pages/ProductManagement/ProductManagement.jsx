import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'
import { HttpStatusCode } from 'axios'
import AxiosConfig from 'utils/AxiosConfig'
import { SignalRService } from 'service/SignalRService'

const ProductManagement = () => {
	const [products, setProducts] = useState([])
	const [openAdd, setOpenAdd] = useState(false)
	const [openUpdate, setOpenUpdate] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState(null)

	useEffect(() => {
		const connectionPro = SignalRService.ProductHub
		connectionPro.invoke('GetProduct')
		connectionPro.on('ReceiveProducts', (products) => {
			setProducts(products)
		})

		const connectionCate = SignalRService.CategoryHub
		connectionCate.invoke('GetCategory')
		connectionCate.on('ReceiveCategories', () => {
			connectionPro.invoke('GetProduct')
		})

		return () => {
			connectionPro.off('ReceiveProducts')
			connectionCate.off('ReceiveCategories')
		}
	}, [])

	const handleDelete = async (id) => {
		const response = await AxiosConfig.delete('/product/delete/' + id)
		if (response.status === HttpStatusCode.Ok) {
			SignalRService.ProductHub.invoke('GetProduct')
		}
	}

	const handleOpenUpdate = (product) => {
		setOpenUpdate(true)
		setSelectedProduct(product)
	}

	return (
		<>
			<Button onClick={() => setOpenAdd(true)}>Add</Button>
			<Table component={Paper} sx={{ width: '75%', mx: 'auto' }}>
				<TableHead>
					<TableRow>
						<TableCell width={'20%'}>Id</TableCell>
						<TableCell width={'20%'}>Name</TableCell>
						<TableCell width={'20%'}>Price</TableCell>
						<TableCell width={'20%'}>Category</TableCell>
						<TableCell width={'20%'}>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products.map((product) => (
						<TableRow key={product.id}>
							<TableCell>{product.id}</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell>${product.price}</TableCell>
							<TableCell>{product.category?.name}</TableCell>
							<TableCell>
								<Button color='success' onClick={() => handleOpenUpdate(product)}>
									Update
								</Button>
								<Button color='error' onClick={() => handleDelete(product.id)}>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{openAdd && <AddProduct open={openAdd} handleClose={() => setOpenAdd(false)} />}
			{openUpdate && (
				<UpdateProduct
					open={openUpdate}
					handleClose={() => setOpenUpdate(false)}
					selectedProduct={selectedProduct}
				/>
			)}
		</>
	)
}

export default ProductManagement
