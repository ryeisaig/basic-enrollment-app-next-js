export const toTitle = (text: any) => {
  if(text){
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
  return text;
}

export const ordinals = (value: number) => {
  const remainder = value % 10;
  switch(remainder) {
    case 1: {
      return value + 'st';
    }
    case 2: {
      return value + 'nd';
    }
    case 3: {
      return value + 'rd';
    }
    default: {
      return value + 'th';
    }
  }
}

export const isEmpty = (value?: string) => {
  if(value === null || typeof(value) === 'undefined' || value.trim() === ''){
    return true;
  }
  return false;
}