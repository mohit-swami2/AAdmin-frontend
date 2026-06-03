/**
 * ProductFormModal — add, edit, or view product details.
 */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal, Button, Input, Select, Textarea } from '@/components/ui';
import { productFormSchema } from '@/utils/validators';
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES } from '@/utils/constants';
import styles from './products.module.css';

const ProductFormModal = ({ isOpen, onClose, onSubmit, product, loading, readOnly = false }) => {
  const isEdit = Boolean(product) && !readOnly;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productFormSchema),
    defaultValues: {
      name: '',
      sku: '',
      category: 'Electronics',
      price: 0,
      stock: 0,
      status: 'Active',
      description: '',
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset(
        product || {
          name: '',
          sku: '',
          category: 'Electronics',
          price: 0,
          stock: 0,
          status: 'Active',
          description: '',
        }
      );
    }
  }, [isOpen, product, reset]);

  const title = readOnly ? 'View Product' : isEdit ? 'Edit Product' : 'Add Product';
  const fieldProps = readOnly ? { disabled: true, readOnly: true } : {};
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form
        onSubmit={readOnly ? (e) => e.preventDefault() : handleSubmit(onSubmit)}
        className={styles.form}
      >
        <div className={styles.row}>
          <Input
            label="Product Name"
            placeholder="Enter product name"
            error={errors.name?.message}
            {...register('name')}
            {...fieldProps}
          />
          <Input
            label="SKU"
            placeholder="Enter SKU"
            error={errors.sku?.message}
            {...register('sku')}
            {...fieldProps}
          />
        </div>
        <div className={styles.row}>
          <Select
            label="Category"
            error={errors.category?.message}
            options={PRODUCT_CATEGORIES}
            {...register('category')}
            disabled={readOnly}
          />
          <Select
            label="Status"
            error={errors.status?.message}
            options={PRODUCT_STATUSES}
            {...register('status')}
            disabled={readOnly}
          />
        </div>
        <div className={styles.row}>
          <Input
            label="Price ($)"
            type="number"
            step="0.01"
            placeholder="0.00"
            error={errors.price?.message}
            {...register('price')}
            {...fieldProps}
          />
          <Input
            label="Stock"
            type="number"
            placeholder="0"
            error={errors.stock?.message}
            {...register('stock')}
            {...fieldProps}
          />
        </div>
        <Textarea
          label="Description"
          placeholder="Product description..."
          error={errors.description?.message}
          {...register('description')}
          disabled={readOnly}
        />
        <div className={styles.formActions}>
          <Button variant="ghost" type="button" onClick={onClose} disabled={loading}>
            {readOnly ? 'Close' : 'Cancel'}
          </Button>
          {!readOnly && (
            <Button type="submit" loading={loading}>
              {isEdit ? 'Update Product' : 'Create Product'}
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
