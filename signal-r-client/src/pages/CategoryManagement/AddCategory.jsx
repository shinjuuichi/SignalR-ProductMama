import { Close } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography,
} from '@mui/material'
import { HttpStatusCode } from 'axios'
import { useState } from 'react'
import { SignalRService } from 'service/SignalRService'
import AxiosConfig from 'utils/AxiosConfig'

const AddProduct = ({ open, handleClose }) => {
	const [category, setCategory] = useState('')

	const handleAdd = async () => {
		const response = await AxiosConfig.post('/category/add', category)

		if (response.status === HttpStatusCode.Ok) {
			SignalRService.CategoryHub.invoke('GetCategory')
			handleClose()
		}
	}

	const handleChangeValue = (e) => {
		const value = e.target.value
		setCategory(String(value))
	}

	return (
		<Dialog open={open} fullWidth maxWidth='lg'>
			<DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography flexGrow={1}>Add Category</Typography>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<TextField label='Name' name='name' value={category} onChange={handleChangeValue} />
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
