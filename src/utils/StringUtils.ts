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
      return value + 'ST';
    }
    case 2: {
      return value + 'ND';
    }
    case 3: {
      return value + 'RD';
    }
    default: {
      return value + 'TH';
    }
  }
}

export const isEmpty = (value?: any) => {
  if(value === null || typeof(value) === 'undefined' || value.trim() === ''){
    return true;
  }
  return false;
}