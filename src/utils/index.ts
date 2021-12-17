export function convertDate(inputDate: string) {
  const date_ob = new Date(inputDate);
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  return `${date}/${month}/${year}`;
}
export function convertDateTime(inputDate: string) {
  const date_ob = new Date(inputDate);
  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  let minutes = date_ob.getMinutes().toString();
  if (minutes === "0") {
    minutes = "00";
  }
  // const seconds = date_ob.getSeconds();
  return `${date}/${month}/${year} ${hours}:${minutes}`;
}
export const currentYear = Number(new Date().getFullYear());
