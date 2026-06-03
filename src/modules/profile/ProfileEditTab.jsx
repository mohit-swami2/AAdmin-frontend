/**
 * ProfileEditTab — editable profile form with validation.
 */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';
import { Button, Input, Textarea } from '@/components/ui';
import { updateUser } from '@/store/authSlice';
import { updateProfile } from './profileService';
import { profileEditSchema } from '@/utils/validators';
import AvatarUpload from './AvatarUpload';
import styles from './profile.module.css';

const ProfileEditTab = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileEditSchema),
    defaultValues: {
      firstName: user?.firstName || user?.name || 'AAdmin',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      website: user?.website || '',
      location: user?.location || '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data);
      dispatch(
        updateUser({
          ...data,
          name: `${data.firstName} ${data.lastName}`.trim(),
        })
      );
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = (avatarUrl) => {
    dispatch(updateUser({ avatar: avatarUrl }));
    toast.success('Avatar updated!');
  };

  return (
    <div className={styles.editForm}>
      <AvatarUpload onUpload={handleAvatarUpload} currentAvatar={user?.avatar} name={user?.name} />
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formRow}>
          <Input
            label="First Name"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <Input
            label="Last Name"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" type="tel" error={errors.phone?.message} {...register('phone')} />
        <Input label="Location" error={errors.location?.message} {...register('location')} />
        <Input label="Website" error={errors.website?.message} {...register('website')} />
        <Textarea label="Bio" rows={3} error={errors.bio?.message} {...register('bio')} />
        <div className={styles.formActions}>
          <Button type="submit" loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditTab;
