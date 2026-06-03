/**
 * UserListPage — user management with CRUD, filters, and pagination.
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
import { setUsersLoading, setUsers, setUsersError } from '@/store/userSlice';
import { getUsers, createUser, updateUser, deleteUser } from './userService';
import { USER_COLUMNS } from './userColumns';
import UserFilters from './UserFilters';
import UserFormModal from './UserFormModal';
import { ITEMS_PER_PAGE } from '@/utils/constants';

const UserListPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector((state) => state.users);
  const tableLoading = useMinLoading(isLoading);
  const { page, setPage, setTotal, totalPages, resetPage } = usePagination();
  const { filters, setFilter } = useFilter({ role: '', status: '', search: '' });
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

  const fetchUsers = useCallback(async () => {
    dispatch(setUsersLoading(true));
    try {
      const response = await getUsers({
        page,
        limit: ITEMS_PER_PAGE,
        role: filters.role,
        status: filters.status,
        search: debouncedSearch,
      });
      dispatch(setUsers({ data: response.data.data, total: response.data.total }));
      setTotal(response.data.total);
    } catch (err) {
      dispatch(setUsersError(err.message));
      toast.error('Failed to load users');
    }
  }, [dispatch, page, filters.role, filters.status, debouncedSearch, setTotal]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    resetPage();
  }, [filters.role, filters.status, debouncedSearch, resetPage]);

  const handleFilterChange = (key, value) => {
    setFilter(key, value);
    setPage(1);
  };

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (formModal.data) {
        await updateUser(formModal.data.id, data);
        toast.success('User updated successfully!');
      } else {
        await createUser(data);
        toast.success('User created successfully!');
      }
      formModal.close();
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteUser(deleteModal.data.id);
      toast.success('User deleted successfully!');
      deleteModal.close();
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageWrapper
      title="User Management"
      breadcrumb="Home / Users"
      actions={
        <Button icon={<RiAddLine />} onClick={() => formModal.open()}>
          Add User
        </Button>
      }
    >
      <FilterBar>
        <UserFilters filters={filters} onFilterChange={handleFilterChange} />
      </FilterBar>

      <DataTable
        columns={USER_COLUMNS}
        data={list}
        loading={tableLoading}
        onView={(row) => viewModal.open(row)}
        onEdit={(row) => formModal.open(row)}
        onDelete={(row) => deleteModal.open(row)}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <UserFormModal
        isOpen={formModal.isOpen}
        onClose={formModal.close}
        onSubmit={handleFormSubmit}
        user={formModal.data}
        loading={submitting}
      />

      <UserFormModal
        isOpen={viewModal.isOpen}
        onClose={viewModal.close}
        user={viewModal.data}
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

export default UserListPage;
