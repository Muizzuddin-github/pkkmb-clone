import { format } from "date-fns";
import idLocale from "date-fns/locale/id";

function datePembayaran(tgl, tipe) {
  const tanggal = new Date(tgl);
  if (tipe === 2) {
    tanggal.setDate(tanggal.getDate() + 15);
  } else {
    tanggal.setDate(tanggal.getDate() + 30);
  }

  const formattedDate = format(tanggal, "dd MMMM yyyy", { locale: idLocale });

  return formattedDate;
}

export default datePembayaran;
