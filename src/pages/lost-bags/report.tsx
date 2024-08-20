import { useState } from 'react';

const ReclaimBag = ({ bagId }: { bagId: number }) => {
  const [reclaimMessage, setReclaimMessage] = useState('');

  const handleReclaim = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/bags/${bagId}/reclaim`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: reclaimMessage }),
    });

    if (response.ok) {
      alert('Reclaim request submitted successfully.');
    } else {
      alert('Failed to submit reclaim request.');
    }
  };

  return (
    <div>
      <h2>Reclaim Bag</h2>
      <textarea
        placeholder="Enter a message to the finder"
        value={reclaimMessage}
        onChange={(e) => setReclaimMessage(e.target.value)}
      />
      <button onClick={handleReclaim}>Submit Reclaim Request</button>
    </div>
  );
};

export default ReclaimBag;
