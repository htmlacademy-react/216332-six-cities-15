type VariantProps = 'number' | 'string';

const numberFormat = (data: Date): string => {
  const date = new Date(data);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const prefix = '-';

  const format = `${month}${prefix}${day}${prefix}${year}`;
  return format;
};

const stringFormat = (data: Date): string => {
  const date = new Date(data);
  const format = date.toLocaleString('en-us',{month:'long', year:'numeric'});
  return format;
};

export const formatTime = (data: string, variant: VariantProps): VariantProps => {
  const date = new Date(data);
  let result;
  switch (variant) {
    case 'number':
      result = numberFormat(date);
      break;
    case 'string':
      result = stringFormat(date);
      break;
    default:
      result = numberFormat(date);
  }

  return result;
};
