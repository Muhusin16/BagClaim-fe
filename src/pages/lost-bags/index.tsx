import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './ReportLostBag.module.css';
import { statesCities, states } from '../../../src/data/statesCitiesData';
import { FaArrowLeft } from 'react-icons/fa';


const ReportLostBag = () => {
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [contents, setContents] = useState('');
  const [lastSeenLocation, setLastSeenLocation] = useState('');
  const [dateTimeLost, setDateTimeLost] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [idProof, setIdProof] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('User is not authenticated. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('primary_color', primaryColor);
    formData.append('secondary_color', secondaryColor);
    formData.append('category', category);
    formData.append('sub_category', subCategory);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('serial_number', serialNumber);
    formData.append('contents', contents);
    formData.append('last_seen_location', lastSeenLocation);
    formData.append('date_time_lost', dateTimeLost);
    formData.append('contact_info', contactInfo);
    formData.append('id_proof', idProof);
    formData.append('address', address);
    formData.append('state', state);
    formData.append('city', city);
    formData.append('zipcode', zipcode);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5002/api/lost-bags', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Lost bag reported successfully.');
        resetForm();
        router.push('/dashboard');
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

  const resetForm = () => {
    setPrimaryColor('');
    setSecondaryColor('');
    setCategory('');
    setSubCategory('');
    setBrand('');
    setModel('');
    setSerialNumber('');
    setContents('');
    setLastSeenLocation('');
    setDateTimeLost('');
    setContactInfo('');
    setIdProof('');
    setAddress('');
    setState('');
    setCity('');
    setZipcode('');
    setImageFile(null);
  };

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif', 'eps', 'pdf', 'jfif'];
  const fileSizeLimit = 4 * 1024 * 1024;  
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const isExtensionValid = fileExtension && allowedExtensions.includes(fileExtension);
      const isFileSizeValid = file.size <= fileSizeLimit;
  
      if (!isExtensionValid) {
        alert(`Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`);
        return;
      }
  
      if (!isFileSizeValid) {
        alert('File size exceeds the limit of 4 MB.');
        return;
      }
  
      setImageFile(file);
    }
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setCity('');
    setZipcode('');
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setZipcode(statesCities[state]?.cities[selectedCity] || '');
  };

  const bagCategories = ['Backpack', 'Suitcase', 'Duffel Bag', 'Tote Bag', 'Messenger Bag', 'Briefcase', 'Handbag'];
  const bagSubCategories = ['Small', 'Medium', 'Large'];
  const colors = ['Black', 'Blue', 'Red', 'Green', 'Yellow', 'Brown', 'White', 'Gray', 'Purple', 'Pink'];

  return (
    <div className={styles.container}>
            <div className={styles.backArrow} onClick={handleGoBack}>
        <FaArrowLeft />
      </div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.heading}>Report a Lost Bag</h2>
        
        {/* Form fields */}
        <select
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          className={styles.inputField}
          required
        >
          <option value="" disabled>Select Primary Color</option>
          {colors.map((colorOption) => (
            <option key={colorOption} value={colorOption}>
              {colorOption}
            </option>
          ))}
        </select>
        
        <select
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
          className={styles.inputField}
        >
          <option value="" disabled>Select Secondary Color (optional)</option>
          {colors.map((colorOption) => (
            <option key={colorOption} value={colorOption}>
              {colorOption}
            </option>
          ))}
        </select>
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.inputField}
          required
        >
          <option value="" disabled>Select Category</option>
          {bagCategories.map((categoryOption) => (
            <option key={categoryOption} value={categoryOption}>
              {categoryOption}
            </option>
          ))}
        </select>
        
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className={styles.inputField}
          required
        >
          <option value="" disabled>Select Sub-Category</option>
          {bagSubCategories.map((subCategoryOption) => (
            <option key={subCategoryOption} value={subCategoryOption}>
              {subCategoryOption}
            </option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Brand (optional)"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={styles.inputField}
        />
        
        <input
          type="text"
          placeholder="Model (optional)"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className={styles.inputField}
        />
        
        <input
          type="text"
          placeholder="Serial Number (optional)"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className={styles.inputField}
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
          className={styles.inputField}
          required
        />
        
        <input
          type="text"
          placeholder="Contact Information"
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
          type="file"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
        
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={styles.inputField}
          required
        />
        
        <select
          value={state}
          onChange={handleStateChange}
          className={styles.inputField}
          required
        >
          <option value="" disabled>Select State</option>
          {states.map((stateOption) => (
            <option key={stateOption} value={stateOption}>
              {stateOption}
            </option>
          ))}
        </select>
        
        <select
          value={city}
          onChange={handleCityChange}
          className={styles.inputField}
          required
        >
          <option value="" disabled>Select City/Town</option>
          {Object.keys(statesCities[state]?.cities || {}).map((cityOption) => (
            <option key={cityOption} value={cityOption}>
              {cityOption}
            </option>
          ))}
        </select>
        
        <input
          type="text"
          placeholder="Zip Code"
          value={zipcode}
          readOnly
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ReportLostBag;
