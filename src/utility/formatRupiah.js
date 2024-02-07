function formatRupiah(num) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(num).replace(",00","")
}

export default formatRupiah;
