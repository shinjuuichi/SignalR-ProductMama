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

const AddProduct = ({ open, handleClose }) => {
	const [product, setProduct] = useState({
		name: '',
		price: 0,
		quantity: 0,
		categoryId: '',
	})

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

	const handleAdd = async () => {
		const response = await AxiosConfig.post('/product/add', product)
		if (response.status === HttpStatusCode.Ok) {
			SignalRService.ProductHub.invoke('GetProduct')
			handleClose()
		}
	}

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

	return (
		<Dialog open={open} fullWidth maxWidth='lg'>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography flexGrow={1}>Add Product</Typography>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
					value={product.categoryId || ''}
					onChange={handleCategoryChange}
					fullWidth
					variant='filled'
					label='Category'
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
				<Button onClick={handleAdd} variant='contained' color='primary'>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddProduct
