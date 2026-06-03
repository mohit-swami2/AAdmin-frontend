/**
 * UserFormModal — add, edit, or view user details.
 */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Button, Input, Select } from '@/components/ui';
import { userFormSchema } from '@/utils/validators';
import { USER_ROLES, USER_STATUSES } from '@/utils/constants';
import styles from './users.module.css';

const UserFormModal = ({ isOpen, onClose, onSubmit, user, loading, readOnly = false }) => {
  const isEdit = Boolean(user) && !readOnly;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(user || { name: '', email: '', role: 'User', status: 'Active' });
    }
  }, [isOpen, user, reset]);

  const title = readOnly ? 'View User' : isEdit ? 'Edit User' : 'Add User';
  const fieldProps = readOnly ? { disabled: true, readOnly: true } : {};

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <form
        onSubmit={readOnly ? (e) => e.preventDefault() : handleSubmit(onSubmit)}
        className={styles.form}
      >
        <Input
          label="Full Name"
          placeholder="Enter full name"
          error={errors.name?.message}
          {...register('name')}
          {...fieldProps}
        />
        <Input
          label="Email"
          type="email"
          placeholder="Enter email address"
          error={errors.email?.message}
          {...register('email')}
          {...fieldProps}
        />
        <Select
          label="Role"
          error={errors.role?.message}
          options={USER_ROLES}
          {...register('role')}
          disabled={readOnly}
        />
        <Select
          label="Status"
          error={errors.status?.message}
          options={USER_STATUSES}
          {...register('status')}
          disabled={readOnly}
        />
        <div className={styles.formActions}>
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
            {readOnly ? 'Close' : 'Cancel'}
          </Button>
          {!readOnly && (
            <Button type="submit" loading={loading}>
              {isEdit ? 'Update User' : 'Create User'}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default UserFormModal;
