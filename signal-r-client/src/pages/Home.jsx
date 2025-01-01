import React from 'react'
import { Button, Stack, Typography, Box } from '@mui/material'

const Home = () => {
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#f5f5f5',
				textAlign: 'center',
				padding: 2,
			}}
		>
			<Stack spacing={4}>
				<Typography variant='h3' fontWeight='bold' color='primary'>
					Welcome to VaiBiu Website!
				</Typography>
				<Typography variant='h6' color='text.secondary'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam perferendis molestias
					nulla eligendi voluptatibus doloremque reprehenderit officia quaerat temporibus mollitia
					consectetur libero, repellat quisquam ab suscipit cumque deleniti ex obcaecati?
				</Typography>
				<Stack direction='row' spacing={2} justifyContent='center'>
					<Button variant='contained' color='primary' size='large'>
						Sinl
					</Button>
					<Button variant='outlined' color='secondary' size='large'>
						Thai
					</Button>
				</Stack>
			</Stack>
		</Box>
	)
}

export default Home
