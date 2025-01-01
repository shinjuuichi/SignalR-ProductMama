import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
	const navigate = useNavigate()
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				padding: '10px 20px',
				background: '#f0f2f5',
				borderBottom: '1px solid #d9d9d9',
			}}
		>
			<h1 style={{ margin: 0 }}>My Vai Biu</h1>
			<div>
				<Button variant='contained' onClick={() => navigate('/')}>Home</Button>
				<Button onClick={() => navigate('/product')}>Product</Button>
				<Button onClick={() => navigate('/product-management')}>Product Management</Button>
				<Button onClick={() => navigate('/category-management')}>Category Management</Button>
			</div>
		</div>
	)
}

export default Header
