/**
 * DataTable — generic table with loading skeleton and empty state.
 */
import { RiEditLine, RiDeleteBinLine, RiEyeLine } from 'react-icons/ri';
import styles from './DataTable.module.css';

const SKELETON_ROW_COUNT = 10;

const SkeletonRows = ({ cols }) =>
  Array.from({ length: SKELETON_ROW_COUNT }).map((_, i) => (
    <tr key={i} className={styles.skeletonRow}>
      {Array.from({ length: cols }).map((__, j) => (
        <td key={j}>
          <div className={styles.skeleton} />
        </td>
      ))}
    </tr>
  ));

const DataTable = ({ columns, data = [], loading = false, onView, onEdit, onDelete }) => {
  const hasActions = onView || onEdit || onDelete;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {hasActions && <th className={styles.actionsCol}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows cols={columns.length + (hasActions ? 1 : 0)} />
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (hasActions ? 1 : 0)} className={styles.empty}>
                No records found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                {hasActions && (
                  <td className={styles.actionsCell}>
                    {onView && (
                      <button
                        type="button"
                        className={styles.actionBtn}
                        onClick={() => onView(row)}
                        aria-label="View"
                      >
                        <RiEyeLine />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        type="button"
                        className={styles.actionBtn}
                        onClick={() => onEdit(row)}
                        aria-label="Edit"
                      >
                        <RiEditLine />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => onDelete(row)}
                        aria-label="Delete"
                      >
                        <RiDeleteBinLine />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
