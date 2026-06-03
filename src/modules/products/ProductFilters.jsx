/**
 * ProductFilters — category, status, price range, and search filters.
 */
import { Input, Select } from '@/components/ui';
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from '@/utils/constants';
import { RiSearchLine } from 'react-icons/ri';

const ProductFilters = ({ filters, onFilterChange }) => {
  return (
    <>
      <Select
        label="Category"
        value={filters.category || ''}
        onChange={(e) => onFilterChange('category', e.target.value)}
        options={PRODUCT_CATEGORIES}
        placeholder="All Categories"
      />
      <Select
        label="Status"
        value={filters.status || ''}
        onChange={(e) => onFilterChange('status', e.target.value)}
        options={PRODUCT_STATUSES}
        placeholder="All Statuses"
      />
      <Input
        label="Min Price"
        type="number"
        placeholder="0"
        value={filters.minPrice || ''}
        onChange={(e) => onFilterChange('minPrice', e.target.value)}
      />
      <Input
        label="Max Price"
        type="number"
        placeholder="1000"
        value={filters.maxPrice || ''}
        onChange={(e) => onFilterChange('maxPrice', e.target.value)}
      />
      <Input
        label="Search"
        placeholder="Search by name or SKU..."
        icon={<RiSearchLine />}
        value={filters.search || ''}
        onChange={(e) => onFilterChange('search', e.target.value)}
      />
    </>
  );
};

export default ProductFilters;
