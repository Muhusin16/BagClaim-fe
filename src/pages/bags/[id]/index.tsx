import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchBag = async () => {
      const response = await fetch(`/api/bags/${id}`);
      const data = await response.json();
      setBag(data);
    };

    if (id) fetchBag();
  }, [id]);

  const handleReclaim = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/bags/${id}/reclaim`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert('Reclaim request submitted');
    } else {
      alert('Failed to submit reclaim request');
    }
  };

  if (!bag) return <div>Loading...</div>;

  return (
    <div>
      <h1>{bag.color} {bag.type}</h1>
      <p>Found at: {bag.found_location}</p>
      <button onClick={handleReclaim}>Reclaim</button>
    </div>
  );
};

export default BagDetails;
