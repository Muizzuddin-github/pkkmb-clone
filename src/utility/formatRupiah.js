function formatRupiah(num) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return formatter.format(num);
}

export default formatRupiah;
