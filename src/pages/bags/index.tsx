import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './bags.module.css';

const ReportFoundBag = () => {
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [contents, setContents] = useState('');
  const [idProof, setIdProof] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [foundLocation, setFoundLocation] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5002/api/bags', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        color,
        type,
        contents,
        id_proof: idProof,
        image_url: imageUrl,
        found_location: foundLocation,
      }),
    });

    if (response.ok) {
      alert('Bag reported successfully.');
      resetForm();
      window.location.reload(); 
    } else {
      alert('Failed to report the bag.');
    }
  };

  const resetForm = () => {
    setColor('');
    setType('');
    setContents('');
    setIdProof('');
    setImageUrl('');
    setFoundLocation('');
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard'); 
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.heading}>Report a Found Bag</h2>
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={styles.inputField}
          required
        />
        <textarea
          placeholder="Contents (optional)"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          className={styles.textareaField}
        />
        <input
          type="text"
          placeholder="ID Proof (optional)"
          value={idProof}
          onChange={(e) => setIdProof(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="text"
          placeholder="Found Location"
          value={foundLocation}
          onChange={(e) => setFoundLocation(e.target.value)}
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>

      <button onClick={handleGoToDashboard} className={styles.dashboardButton}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default ReportFoundBag;
