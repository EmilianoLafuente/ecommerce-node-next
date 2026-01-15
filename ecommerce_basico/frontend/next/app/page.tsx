'use client'

import { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'
import ProductGrid from '@/components/product/ProductGrid'
import ProductSearch from '@/components/product/ProductSearch'
import ProductFilters from '@/components/product/ProductFilters'
import Pagination from '@/components/ui/Pagination'
import { getProducts } from '@/services/products.service'
import { Product } from '@/services/products.service'

const ITEMS_PER_PAGE = 8

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const [filters, setFilters] = useState<{
    width: number | ''
    profile: number | ''
    rim: number | ''
  }>({
    width: '',
    profile: '',
    rim: ''
  })

  useEffect(() => {
    getProducts().then(setProducts)
  }, [])

  useEffect(() => {
    setPage(1)
  }, [search, filters])

  const widths = [...new Set(products.map(p => p.width))].sort((a, b) => a - b)
  const profiles = [...new Set(products.map(p => p.profile))].sort((a, b) => a - b)
  const rims = [...new Set(products.map(p => p.rim))].sort((a, b) => a - b)

  const filteredProducts = products.filter(product => {
    const matchSearch =
      `${product.brand} ${product.model}`
        .toLowerCase()
        .includes(search.toLowerCase())

    const matchWidth = filters.width === '' || product.width === filters.width
    const matchProfile = filters.profile === '' || product.profile === filters.profile
    const matchRim = filters.rim === '' || product.rim === filters.rim

    return matchSearch && matchWidth && matchProfile && matchRim
  })

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  return (
    <Container>
      <h1 className="page-title">Productos</h1>

      <ProductSearch value={search} onChange={setSearch} />

      <ProductFilters
        width={filters.width}
        profile={filters.profile}
        rim={filters.rim}
        widths={widths}
        profiles={profiles}
        rims={rims}
        onChange={setFilters}
      />

      {paginatedProducts.length === 0 ? (
        <p>No se encontraron productos.</p>
      ) : (
        <>
          <ProductGrid products={paginatedProducts} />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </Container>
  )
}