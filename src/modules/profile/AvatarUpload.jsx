/**
 * AvatarUpload — drag-drop avatar upload with circular preview.
 */
import { useRef, useState } from 'react';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { Avatar } from '@/components/ui';
import { uploadAvatar } from './profileService';
import { toast } from 'react-toastify';
import styles from './profile.module.css';

const AvatarUpload = ({ onUpload, currentAvatar, name }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentAvatar);

  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB');
      return;
    }

    setUploading(true);
    try {
      const response = await uploadAvatar(file);
      setPreview(response.data.avatar);
      onUpload(response.data.avatar);
    } catch {
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className={styles.avatarUpload}>
      <Avatar src={preview} name={name} size="lg" />
      <div
        className={styles.dropZone}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <RiUploadCloud2Line className={styles.uploadIcon} />
        <p>{uploading ? 'Uploading...' : 'Drag & drop or click to upload avatar'}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default AvatarUpload;
