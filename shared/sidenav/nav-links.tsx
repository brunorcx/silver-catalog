"use client";
import { FaHome, FaFileInvoice, FaUsers } from "react-icons/fa"; // Importing icons from react-icons
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./nav-links.module.scss";

// Map of links to display in the side navigation.
const links = [
  { name: "Home", href: "/login", icon: FaHome },
  { name: "Invoices", href: "/dashboard/invoices", icon: FaFileInvoice },
  { name: "Customers", href: "/dashboard/customers", icon: FaUsers },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link key={link.name} href={link.href} className={`${styles.button} ${isActive ? "link-active" : ""}`}>
            <LinkIcon className="link-icon" />
            <p className="show-on-md">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
