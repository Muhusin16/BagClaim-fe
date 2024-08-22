import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './bag-details.module.css';
import Image from 'next/image';

interface Bag {
  id: number;
  primary_color: string;
  secondary_color?: string;
  category: string;
  sub_category?: string;
  brand?: string;
  model?: string;
  serial_number?: string;
  contents?: string;
  id_proof?: string;
  found_location: string;
  image_url?: string;
}

const BagDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bag, setBag] = useState<Bag | null>(null);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [updatedBag, setUpdatedBag] = useState<Partial<Bag>>({});

  useEffect(() => {
    const fetchBag = async () => {
      if (id) {
        const response = await fetch(`http://localhost:5002/api/bags/${id}`);
        const data = await response.json();
        setBag(data);
      }
    };

    fetchBag();
  }, [id]);

  const handleReclaim = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5002/api/bags/${id}/reclaim`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        alert('Reclaim request submitted');
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Failed to submit reclaim request: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting reclaim request:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleUpdateBag = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/bags/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBag),
      });

      if (response.ok) {
        const data = await response.json();
        setBag(data);
        setEditing(false);
        alert('Bag updated successfully');
      } else {
        const errorData = await response.json();
        alert(`Failed to update bag: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating bag:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleDeleteBag = async () => {
    if (!confirm('Are you sure you want to delete this bag?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5002/api/bags/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Bag deleted successfully');
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        alert(`Failed to delete bag: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting bag:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdatedBag({
      ...updatedBag,
      [e.target.name]: e.target.value,
    });
  };

  if (!bag) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{bag.primary_color} {bag.category} ({bag.sub_category})</h1>
      <p>Found at: {bag.found_location}</p>
      {bag.contents && <p>Contents: {bag.contents}</p>}
      {bag.image_url && (
        <div className={styles.imageContainer}>
          <Image
            src={`http://localhost:5002/${bag.image_url}`}
            alt="Bag Image"
            className={styles.image}
            width={200}
            height={200}
          />
        </div>
      )}

      <div className={styles.buttonContainer}>
        <button onClick={handleReclaim} className={styles.reclaimButton}>Reclaim</button>
        <button onClick={() => setEditing(true)} className={styles.editButton}>Edit Bag</button>
        <button onClick={handleDeleteBag} className={styles.deleteButton}>Delete Bag</button>
        <button onClick={() => router.push('/dashboard')} className={styles.dashboardButton}>Go to Dashboard</button>
      </div>

      {editing && (
        <div className={styles.editContainer}>
          {/* Edit form fields */}
          <input
            type="text"
            name="primary_color"
            placeholder="Primary Color"
            defaultValue={bag.primary_color}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="secondary_color"
            placeholder="Secondary Color (optional)"
            defaultValue={bag.secondary_color || ''}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            defaultValue={bag.category}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="sub_category"
            placeholder="Sub-Category (optional)"
            defaultValue={bag.sub_category || ''}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="brand"
            placeholder="Brand (optional)"
            defaultValue={bag.brand || ''}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="model"
            placeholder="Model (optional)"
            defaultValue={bag.model || ''}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="serial_number"
            placeholder="Serial Number (optional)"
            defaultValue={bag.serial_number || ''}
            onChange={handleInputChange}
            className={styles.input}
          />
          <textarea
            name="contents"
            placeholder="Contents (optional)"
            defaultValue={bag.contents || ''}
            onChange={handleInputChange}
            className={styles.textarea}
          />
          <textarea
            name="id_proof"
            placeholder="ID Proof (optional)"
            defaultValue={bag.id_proof || ''}
            onChange={handleInputChange}
            className={styles.textarea}
          />
          <button onClick={handleUpdateBag} className={styles.updateButton}>Save Changes</button>
          <button onClick={() => setEditing(false)} className={styles.cancelButton}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BagDetails;
