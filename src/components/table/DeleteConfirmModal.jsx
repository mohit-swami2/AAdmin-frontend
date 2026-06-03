/**
 * DeleteConfirmModal — reusable delete confirmation dialog.
 */
import { Button, Modal } from '@/components/ui';
import styles from './DeleteConfirmModal.module.css';

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete" size="sm">
      <p className={styles.message}>
        Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
      </p>
      <div className={styles.actions}>
        <Button variant="ghost" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} loading={loading}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
