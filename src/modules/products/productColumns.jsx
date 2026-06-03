import { Badge } from '@/components/ui';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import tableStyles from '@/components/table/DataTable.module.css';

export const PRODUCT_COLUMNS = [
  { key: 'name', label: 'Product' },
  { key: 'sku', label: 'SKU' },
  {
    key: 'category',
    label: 'Category',
    render: (row) => <Badge label={row.category} />,
  },
  {
    key: 'price',
    label: 'Price',
    render: (row) => formatCurrency(row.price),
  },
  {
    key: 'stock',
    label: 'Stock',
    render: (row) => (
      <span className={row.stock < 10 ? tableStyles.lowStock : ''}>{row.stock}</span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <Badge label={row.status} />,
  },
  {
    key: 'createdAt',
    label: 'Created',
    render: (row) => formatDate(row.createdAt),
  },
];
