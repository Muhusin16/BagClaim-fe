import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './bags.module.css';
import Image from 'next/image';

const ReportFoundBag = () => {
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [contents, setContents] = useState('');
  const [idProof, setIdProof] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [foundLocation, setFoundLocation] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('color', color);
    formData.append('type', type);
    formData.append('contents', contents);
    formData.append('id_proof', idProof);
    formData.append('found_location', foundLocation);

    if (imageFile) {
      formData.append('image', imageFile); 
    }

    try {
      const response = await fetch('http://localhost:5002/api/bags', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        alert('Bag reported successfully.');
        resetForm();
        router.push('/dashboard'); // Redirect to dashboard on success
      } else {
        const errorData = await response.json();
        alert(`Failed to report the bag: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error reporting the bag:', error);
      alert('An unexpected error occurred. Please try again later.');
    }
  };

  const resetForm = () => {
    setColor('');
    setType('');
    setContents('');
    setIdProof('');
    setImageFile(null);
    setFoundLocation('');
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard'); 
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      console.log(e.target.files[0]);
      
    }
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
          type="file"
          onChange={handleImageChange}
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
