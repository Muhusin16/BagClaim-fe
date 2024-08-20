import { useState, useEffect } from 'react';
import Navbar from "@/app/navbar";
import styles from './Dashboard.module.css';

interface Bag {
  id: number;
  color: string;
  type: string;
  found_location: string;
  contents?: string;
  image_url?: string;
}

const Dashboard = () => {
  const [bags, setBags] = useState<Bag[]>([]);
  const [searchParams, setSearchParams] = useState({
    color: '',
    type: '',
    found_location: ''
  });

  const fetchBags = async () => {
    const query = new URLSearchParams(searchParams).toString();
    const response = await fetch(`http://localhost:5002/api/bags/search?${query}`);
    const data = await response.json();
    setBags(data);
  };

  useEffect(() => {
    fetchBags();
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBags();
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Found Bags</h1>

        <form className={styles.form} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="color"
            placeholder="Search by color"
            value={searchParams.color}
            onChange={handleSearchChange}
            className={styles.input}
          />
          <input
            type="text"
            name="type"
            placeholder="Search by type"
            value={searchParams.type}
            onChange={handleSearchChange}
            className={styles.input}
          />
          <input
            type="text"
            name="found_location"
            placeholder="Search by location"
            value={searchParams.found_location}
            onChange={handleSearchChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Search</button>
        </form>

        <div className={styles.list}>
          {bags.length > 0 ? (
            <ul>
              {bags.map((bag) => (
                <li key={bag.id} className={styles.listItem}>
                  <strong>{bag.color} {bag.type}</strong> - Found at: {bag.found_location}
                  
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noBags}>No bags found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
