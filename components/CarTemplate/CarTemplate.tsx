import listCss from "../CarList/CarList.module.css"; 
import cardCss from "./CarTemplate.module.css";
import Skeleton from "react-loading-skeleton";

type CarsSkeletonProps = {
  cards: number;
};

export default function CarsSkeleton({ cards }: CarsSkeletonProps) {
  return (
    <ul className={listCss.list}>
      {Array.from({ length: cards }).map((_, i) => (
        <li className={cardCss.item} key={i}>
          <div className={cardCss.imgWrapper}>
            <Skeleton width="100%" height={268} />
          </div>

          <div className={cardCss.info}>
            <Skeleton height={16} style={{ marginBottom: 8 }} />
            <div className={cardCss.details}>
              <Skeleton height={12} />
              <Skeleton height={12} />
            </div>
          </div>

          <Skeleton height={44} />
        </li>
      ))}
    </ul>
  );
}