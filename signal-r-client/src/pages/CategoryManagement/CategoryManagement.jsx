import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'
import AddCategory from './AddCategory'
import { HttpStatusCode } from 'axios'
import AxiosConfig from 'utils/AxiosConfig'
import { SignalRService } from 'service/SignalRService'
import UpdateCategory from './UpdateCategory'

const CategoryManagement = () => {
	const [categories, setCategories] = useState([])
	const [openAdd, setOpenAdd] = useState(false)
	const [openUpdate, setOpenUpdate] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState(null)

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

	const handleDelete = async (id) => {
		const response = await AxiosConfig.delete('/category/delete/' + id).then((res) => res)
		if (response.status === HttpStatusCode.Ok) {
			SignalRService.CategoryHub.invoke('GetCategory')
		}
	}

	const handleOpenUpdate = (category) => {
		setOpenUpdate(true)
		setSelectedCategory(category)
	}

	return (
		<>
			<Button onClick={() => setOpenAdd(true)}>Add</Button>
			<Table component={Paper} sx={{ width: '75%', mx: 'auto' }}>
				<TableHead>
					<TableRow>
						<TableCell width={'20%'}>Id</TableCell>
						<TableCell width={'20%'}>Name</TableCell>
						<TableCell width={'20%'}>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{categories.map((category) => (
						<TableRow>
							<TableCell>{category.id}</TableCell>
							<TableCell>{category.name}</TableCell>
							<TableCell>
								<Button color='success' onClick={() => handleOpenUpdate(category)}>
									Update
								</Button>
								<Button color='error' onClick={() => handleDelete(category.id)}>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{openAdd && <AddCategory open={openAdd} handleClose={() => setOpenAdd(false)} />}
			{openUpdate && (
				<UpdateCategory
					open={openUpdate}
					handleClose={() => setOpenUpdate(false)}
					selectedCategory={selectedCategory}
				/>
			)}
		</>
	)
}

export default CategoryManagement
