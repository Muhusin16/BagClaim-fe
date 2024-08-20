import Link from 'next/link';
import styles from './Navbar.module.css'; // Import CSS module for styling

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/lost-bags">Report Lost Bag</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/bags">Report Found Bag</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
