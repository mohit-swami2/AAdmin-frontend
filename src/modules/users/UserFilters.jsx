/**
 * UserFilters — role, status, and search filters for user list.
 */
import { Input, Select } from '@/components/ui';
import { USER_ROLES, USER_STATUSES } from '@/utils/constants';
import { RiSearchLine } from 'react-icons/ri';

const UserFilters = ({ filters, onFilterChange }) => {
  return (
    <>
      <Select
        label="Role"
        value={filters.role || ''}
        onChange={(e) => onFilterChange('role', e.target.value)}
        options={USER_ROLES}
        placeholder="All Roles"
      />
      <Select
        label="Status"
        value={filters.status || ''}
        onChange={(e) => onFilterChange('status', e.target.value)}
        options={USER_STATUSES}
        placeholder="All Statuses"
      />
      <Input
        label="Search"
        placeholder="Search by name or email..."
        icon={<RiSearchLine />}
        value={filters.search || ''}
        onChange={(e) => onFilterChange('search', e.target.value)}
      />
    </>
  );
};

export default UserFilters;
