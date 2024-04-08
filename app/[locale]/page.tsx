import { useTranslations } from "next-intl";
import { Table } from "@/components/Table";
export default function Home() {
   const t = useTranslations("Index");

   return (
     <>
       <Table />
     </>
   );
}
