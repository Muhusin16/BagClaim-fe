import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './ReportLostBag.module.css';

const ReportLostBag = () => {
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [contents, setContents] = useState('');
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [dateTimeLost, setDateTimeLost] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [idProof, setIdProof] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User is not authenticated. Please log in.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5002/api/lost-bags', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          color,
          type,
          contents,
          last_seen_location: lastSeenLocation,
          date_time_lost: dateTimeLost,
          contact_info: contactInfo,
          id_proof: idProof,
          image_url: imageUrl,
        }),
      });

      if (response.ok) {
        alert('Lost bag reported successfully.');
        // Clear the form fields
        setColor('');
        setType('');
        setContents('');
        setLastSeenLocation('');
        setDateTimeLost('');
        setContactInfo('');
        setIdProof('');
        setImageUrl('');

        // Optionally, refresh the page
        // router.reload();
      } else {
        const errorData = await response.json();
        alert(`Failed to report the lost bag: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error reporting lost bag:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirectToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.heading}>Report a Lost Bag</h2>
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
          placeholder="Last Seen Location"
          value={lastSeenLocation}
          onChange={(e) => setLastSeenLocation(e.target.value)}
          className={styles.inputField}
          required
        />
        <input
          type="datetime-local"
          value={dateTimeLost}
          onChange={(e) => setDateTimeLost(e.target.value)}
          className={styles.datetimeField}
          required
        />
        <input
          type="text"
          placeholder="Contact Info"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          className={styles.inputField}
          required
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
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <button onClick={handleRedirectToDashboard} className={styles.dashboardButton}>
        Go to Dashboard
      </button>
    </div>
  );
};

export default ReportLostBag;
