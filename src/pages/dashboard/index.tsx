import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/app/navbar";
import styles from './Dashboard.module.css';

interface Bag {
  id: number;
  primary_color: string;
  category: string;
  found_location: string;
}

// Debounce function to limit the rate at which a function can fire
function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

const Dashboard = () => {
  const [bags, setBags] = useState<Bag[]>([]);
  const [searchParams, setSearchParams] = useState({
    primary_color: '',
    category: '',
    found_location: ''
  });

  const router = useRouter();

  const fetchBags = async () => {
    const query = new URLSearchParams(searchParams).toString();
    const response = await fetch(`http://localhost:5002/api/bags/search?${query}`);
    const data = await response.json();
    setBags(data);
  };

  // Debounced version of the fetchBags function
  const debounceFetchBags = useCallback(debounce(fetchBags, 300), [searchParams]);

  useEffect(() => {
    debounceFetchBags();
  }, [searchParams, debounceFetchBags]);

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

  const handleViewDetails = (id: number) => {
    router.push(`/bags/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Found Bags</h1>

        <form className={styles.form} onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="primary_color"
            placeholder="Search by color"
            value={searchParams.primary_color}
            onChange={handleSearchChange}
            className={styles.input}
          />
          <input
            type="text"
            name="category"
            placeholder="Search by category"
            value={searchParams.category}
            onChange={handleSearchChange}
            className={styles.input}
          />
          <input
            type="text"
            name="found_location"
            placeholder="Search by found location"
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
                  <strong>{bag.primary_color} {bag.category}</strong> - Found at: {bag.found_location}
                  <br />
                  <button
                    onClick={() => handleViewDetails(bag.id)}
                    className={styles.viewButton}
                  >
                    View Details
                  </button>
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
