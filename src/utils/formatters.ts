export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatPhoneNumber(phoneNumber: string | number) {
  const digits = phoneNumber.toString();
  if (digits.startsWith("0")) return digits;

  return `0${digits}`;
}
