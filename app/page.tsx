
import Link from "next/link";
import css from "@/app/Home.module.css"

export default function Home() {
  return (
    <>
    <div className={css.home_container}>
      <div className={css.page_info}>
    <h1 className={css.title}>Find your perfect rental car</h1>
    <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
    <Link href="/catalog" className={css.view_btn}>View Catalog</Link>
    </div> 
    </div>
    </>
  );
}
