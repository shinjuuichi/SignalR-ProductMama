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

const UpdateCategory = ({ open, selectedCategory, handleClose }) => {
	const [category, setCategory] = useState(selectedCategory)

	const handleChangeValue = (e) => {
		const { name, value } = e.target
		setCategory((prev) => ({ ...prev, [name]: value }))
	}

	const handleUpdate = async () => {
		const response = await AxiosConfig.patch('/category/update', category).then((res) => res)
		if (response.status === HttpStatusCode.Ok) {
			SignalRService.CategoryHub.invoke('GetCategory')
			handleClose()
		}
	}

	return (
		<Dialog open={open} fullWidth maxWidth={'lg'}>  
			<DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography flexGrow={1}>Update #{category.id}</Typography>
				<IconButton onClick={handleClose}>
					<Close />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<TextField label='Id' name='Id' value={category.id} disabled />

				<TextField label='name' name='name' value={category.name} onChange={handleChangeValue} />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleUpdate}>Update</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UpdateCategory
