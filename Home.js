
import React, { useEffect, useState } from 'react';
import { SimpleGrid, Select, Box, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('API_PRODUCTS_ENDPOINT');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    const sortedProducts = [...products].sort((a, b) =>
      sortValue === 'ascending' ? a.price - b.price : b.price - a.price
    );
    setProducts(sortedProducts);
    setSearchParams({ sort: sortValue });
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    const filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === filterValue.toLowerCase()
    );
    setProducts(filteredProducts);
    setSearchParams({ filter: filterValue });
  };

  return (
    <Box>
      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}
      <Box mb="4">
        <Select placeholder="Sort by Price" onChange={handleSortChange}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </Select>
        <Select placeholder="Filter by Category" onChange={handleFilterChange}>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
          <option value="Home Decor">Home Decor</option>
        </Select>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing="8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
