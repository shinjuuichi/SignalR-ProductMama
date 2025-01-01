import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import ProductManagement from './pages/ProductManagement/ProductManagement'
import CategoryManagement from './pages/CategoryManagement/CategoryManagement'
import Header from './layouts/header'
import Footer from './layouts/footer'

function App() {
	return (
		<BrowserRouter>
			<Header />
			<div className='App'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/product' element={<Product />} />
					<Route path='/product-management' element={<ProductManagement />} />
					<Route path='/category-management' element={<CategoryManagement />} />
				</Routes>
			</div>
			<Footer />
		</BrowserRouter>
	)
}

export default App
