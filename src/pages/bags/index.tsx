import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './bags.module.css';
import { FaArrowLeft } from 'react-icons/fa';

const ReportFoundBag = () => {
  const [primaryColor, setPrimaryColor] = useState('');
  const [secondaryColor, setSecondaryColor] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [contents, setContents] = useState('');
  const [idProof, setIdProof] = useState('');
  const [foundLocation, setFoundLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('primary_color', primaryColor);
    formData.append('secondary_color', secondaryColor);
    formData.append('category', category);
    formData.append('sub_category', subCategory);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('serial_number', serialNumber);
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
        router.push('/dashboard');
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
    setPrimaryColor('');
    setSecondaryColor('');
    setCategory('');
    setSubCategory('');
    setBrand('');
    setModel('');
    setSerialNumber('');
    setContents('');
    setIdProof('');
    setFoundLocation('');
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

  const bagCategories = ['Backpack', 'Suitcase', 'Duffel Bag', 'Tote Bag', 'Messenger Bag', 'Briefcase', 'Handbag'];
  const bagSubCategories = ['Small', 'Medium', 'Large']; 
  const colors = ['Black', 'Blue', 'Red', 'Green', 'Yellow', 'Brown', 'White', 'Gray', 'Purple', 'Pink'];

  return (
    <div className={styles.container}>
      <div className={styles.backArrow} onClick={handleGoBack}>
        <FaArrowLeft />
      </div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2 className={styles.heading}>Report a Found Bag</h2>
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
    </div>
  );
};

export default ReportFoundBag;
