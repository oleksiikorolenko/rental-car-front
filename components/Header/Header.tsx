import Link from "next/link";
import css from "@/components/Header/Header.module.css"
import Image from "next/image";
import Logo from "@/public/icon/Logo.svg"

export default function Header() {
    return (
        <header className={css.header}> 
      <div className={css.logo_container}>
        <Link href="/" className={css.logo}><Image src={Logo} alt={Logo} width={104} height={16}/></Link>
      </div>
      <nav className={css.nav_container}>
        <Link href="/" className={css.nav_link}>Home</Link>
        <Link href="/catalog" className={css.nav_link}>Catalog</Link>
       </nav>
     </header> 
    ); 
};