import Link from "next/link";
import NavLinks from "@/shared/sidenav/nav-links";
import { FaPowerOff } from "react-icons/fa"; // React Icon for PowerIcon
import styles from "./sidenav.module.scss"; // Importing the SCSS module

export default function SideNav() {
  return (
    <div className={styles.sideNavContainer}>
      <Link className={styles.logoLink} href="/">
        <div className={styles.logoText}>Logo</div>
      </Link>
      <div className={styles.navContent}>
        <NavLinks />
        <div className={styles.placeholder}></div>
        <form>
          <button className={styles.signOutButton}>
            <FaPowerOff className={styles.icon} />
            <div className="show-on-md">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
