import { Avatar, Badge } from '@/components/ui';
import { formatDate } from '@/utils/formatDate';
import tableStyles from '@/components/table/DataTable.module.css';

export const USER_COLUMNS = [
  {
    key: 'name',
    label: 'Name',
    render: (row) => (
      <div className={tableStyles.userCell}>
        <Avatar name={row.name} size="sm" />
        <span className={tableStyles.userName}>{row.name}</span>
      </div>
    ),
  },
  { key: 'email', label: 'Email' },
  {
    key: 'role',
    label: 'Role',
    render: (row) => <Badge label={row.role} />,
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge label={row.status} />,
  },
  {
    key: 'joined',
    label: 'Joined',
    render: (row) => formatDate(row.createdAt),
  },
];
