import Link from "next/link";
import css from "@/components/Header/Header.module.css"
export default function Header() {
    return (
        <> 
      <div className={css.logo_container}>
        <Link href="/" className={css.logo}>Rental<span className={css.span_logo}>Car</span></Link>
      </div>
      <nav className={css.nav_container}>
        <Link href="/" className={css.nav_link}>Home</Link>
        <Link href="/catalog">Catalog</Link>
       </nav>
     </> 
    ); 
};