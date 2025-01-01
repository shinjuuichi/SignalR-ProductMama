import { Close } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import { HttpStatusCode } from 'axios'
import { useEffect, useState } from 'react'
import { SignalRService } from 'service/SignalRService'
import AxiosConfig from 'utils/AxiosConfig'

const UpdateProduct = ({ open, selectedProduct, handleClose }) => {
	const [product, setProduct] = useState(selectedProduct)
	const [categories, setCategories] = useState([])

	useEffect(() => {
		const connection = SignalRService.CategoryHub
		connection.invoke('GetCategory')
		connection.on('ReceiveCategories', (categories) => {
			setCategories(categories)
		})

		return () => {
			connection.off('ReceiveCategories')
		}
	}, [])

	const handleChangeValue = (e) => {
		const { name, value } = e.target
		setProduct((prev) => ({
			...prev,
			[name]: name === 'price' || name === 'quantity' ? Number(value) : value,
		}))
	}

	const handleCategoryChange = (e) => {
		setProduct((prev) => ({
			...prev,
			categoryId: e.target.value,
		}))
	}

	const handleUpdate = async () => {
		const response = await AxiosConfig.patch('/product/update', product)
		if (response.status === HttpStatusCode.Ok) {
			SignalRService.ProductHub.invoke('GetProduct')
			handleClose()
		}
	}

	return (
		<Dialog open={open} fullWidth maxWidth='lg'>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography flexGrow={1}>Update Product #{product.id}</Typography>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<TextField label='ID' name='id' value={product.id} disabled />
				<TextField label='Name' name='name' value={product.name} onChange={handleChangeValue} />

				<TextField
					label='Price'
					type='number'
					name='price'
					value={product.price}
					onChange={handleChangeValue}
				/>
				<TextField
					label='Quantity'
					type='number'
					name='quantity'
					value={product.quantity}
					onChange={handleChangeValue}
				/>
				<Select
					value={product.categoryId}
					onChange={handleCategoryChange}
					fullWidth
					variant='outlined'
				>
					<MenuItem value='' disabled>
						Select Category
					</MenuItem>
					{categories.map((category) => (
						<MenuItem key={category.id} value={category.id}>
							{category.name}
						</MenuItem>
					))}
				</Select>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleUpdate} variant='contained' color='primary'>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UpdateProduct
