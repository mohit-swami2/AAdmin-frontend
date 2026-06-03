/**
 * ProductListPage — product management with CRUD, filters, and pagination.
 */
import { useEffect, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RiAddLine } from 'react-icons/ri';
import { PageWrapper } from '@/components/layout';
import { Button } from '@/components/ui';
import { DataTable, Pagination, FilterBar, DeleteConfirmModal } from '@/components/table';
import { usePagination } from '@/hooks/usePagination';
import { useFilter } from '@/hooks/useFilter';
import { useDebounce } from '@/hooks/useDebounce';
import { useModal } from '@/hooks/useModal';
import { useMinLoading } from '@/hooks/useMinLoading';
import { setProductsLoading, setProducts, setProductsError } from '@/store/productSlice';
import { getProducts, createProduct, updateProduct, deleteProduct } from './productService';
import { PRODUCT_COLUMNS } from './productColumns';
import ProductFilters from './ProductFilters';
import ProductFormModal from './ProductFormModal';
import { ITEMS_PER_PAGE } from '@/utils/constants';

const ProductListPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((state) => state.products);
  const tableLoading = useMinLoading(isLoading);
  const { page, setPage, setTotal, totalPages, resetPage } = usePagination();
  const { filters, setFilter } = useFilter({
    category: '',
    status: '',
    search: '',
    minPrice: '',
    maxPrice: '',
  });
  const debouncedSearch = useDebounce(filters.search);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setFilter('search', q);
  }, [searchParams, setFilter]);
  const formModal = useModal();
  const viewModal = useModal();
  const deleteModal = useModal();
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    dispatch(setProductsLoading(true));
    try {
      const response = await getProducts({
        page,
        limit: ITEMS_PER_PAGE,
        category: filters.category,
        status: filters.status,
        search: debouncedSearch,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      });
      dispatch(setProducts({ data: response.data.data, total: response.data.total }));
      setTotal(response.data.total);
    } catch (err) {
      dispatch(setProductsError(err.message));
      toast.error('Failed to load products');
    }
  }, [
    dispatch,
    page,
    filters.category,
    filters.status,
    filters.minPrice,
    filters.maxPrice,
    debouncedSearch,
    setTotal,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    resetPage();
  }, [
    filters.category,
    filters.status,
    filters.minPrice,
    filters.maxPrice,
    debouncedSearch,
    resetPage,
  ]);

  const handleFilterChange = (key, value) => {
    setFilter(key, value);
    setPage(1);
  };

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (formModal.data) {
        await updateProduct(formModal.data.id, data);
        toast.success('Product updated successfully!');
      } else {
        await createProduct(data);
        toast.success('Product created successfully!');
      }
      formModal.close();
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(deleteModal.data.id);
      toast.success('Product deleted successfully!');
      deleteModal.close();
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageWrapper
      title="Product Management"
      breadcrumb="Home / Products"
      actions={
        <Button icon={<RiAddLine />} onClick={() => formModal.open()}>
          Add Product
        </Button>
      }
    >
      <FilterBar>
        <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
      </FilterBar>

      <DataTable
        columns={PRODUCT_COLUMNS}
        data={list}
        loading={tableLoading}
        onView={(row) => viewModal.open(row)}
        onEdit={(row) => formModal.open(row)}
        onDelete={(row) => deleteModal.open(row)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <ProductFormModal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        onSubmit={handleFormSubmit}
        product={formModal.data}
        loading={submitting}
      />

      <ProductFormModal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        product={viewModal.data}
        readOnly
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDelete}
        itemName={deleteModal.data?.name}
        loading={deleting}
      />
    </PageWrapper>
  );
};

export default ProductListPage;
