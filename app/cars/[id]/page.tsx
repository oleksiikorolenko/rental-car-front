
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCarById } from "@/lib/api/clientApi";
import CarDetails from "@/components/CarDetails/CarDetails";


type CarPageProps = {
  params: Promise<{ id: string }>;
};



export const generateMetadata = async ({ params }: CarPageProps):Promise<Metadata>=>{
const {id} = await params;
const data = await fetchCarById(id);

return {
  title: data.brand,
  description: data.description.slice(0, 25),
      openGraph: {
      title: `RentCar: ${data.brand}`,
      description: `${data.description.slice(0, 25)}`,
      url: `https://rent-cars-app-evl6.vercel.app/cars/${id}`,
      siteName: `RentCar: ${data.brand}`,
        images: ["/og-car.png"],
      type: 'website',
    },
}
}


export default async function CarPage({ params }: CarPageProps) {
  const { id } = await params;

  const car = await fetchCarById(id);

  if (!car) {
    notFound();
  }

  return (<CarDetails id={id} />);
}


