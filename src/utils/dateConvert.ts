export const toMysqlFormat = (date: Date) => {
  return date.toISOString().slice(0, 19).replace("T", " ");
};

export const stringToDate = (date: string) => {
  const [day, month, year] = date.split("/");
  return new Date(`${year}-${month}-${day}`);
};
