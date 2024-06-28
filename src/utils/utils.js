import format from 'date-fns/format';

export function formatDate(date) {
  return format(new Date(date), 'yyyy-MM-dd');
}

export function convertDateToString(date) {
  return date.toLocaleDateString();
}

export function convertStringToDate(str) {
  return new Date(str);
}

export function formatPrice(number) {

      const formattedNumber = Number(number).toFixed(2).toString();


      const parts = formattedNumber.split('.');
      let integerPart = parts[0];
      const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
  

      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
      return '$' + integerPart + decimalPart;
}

export function invoicesCountText(invoiceCount) {
  let msg;
  if (invoiceCount === 0) {
    msg = 'No invoices';
  } else if (invoiceCount === 1) {
    msg = '1 Invoice';
  } else {
    msg = `${invoiceCount} Invoices`;
  }
  return msg;
}
