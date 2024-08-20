// pages/bag-details/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './bag-details.module.css';
import Image from 'next/image';

interface Bag {
  id: number;
  color: string;
  type: string;
  found_location: string;
  contents?: string;
  image_url?: string;
}

const BagDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bag, setBag] = useState<Bag | null>(null);
  const [message, setMessage] = useState('');

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

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  if (!bag) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{bag.color} {bag.type}</h1>
      <p>Found at: {bag.found_location}</p>
      {bag.contents && <p>Contents: {bag.contents}</p>}
      {bag.image_url && (
        <div className={styles.imageContainer}>
          <Image
            src={`http://localhost:5002/${bag.image_url}`}
            alt="Bag Image"
            className={styles.image}
            width={100}
            height={100}
          />
        </div>
      )}
      <textarea
        placeholder="Additional Information (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className={styles.textarea}
      />
      <button onClick={handleReclaim} className={styles.reclaimButton}>
        Reclaim
      </button>
      <button onClick={handleGoToDashboard} className={styles.dashboardButton}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default BagDetails;
