export const isValidEmail = (email: string): boolean => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email) ? undefined : 'El correo no parece ser válido';
};

export const isStrongPassword = (password: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&ñ*]).{8,}$/;
  return !!regex.test(password);
};

export const isValidPassword = (password: string): string | undefined => {
  return isStrongPassword(password)
    ? undefined
    : 'La contraseña necesita al menos una letra mayúsuca, una minúscula, un número y un símbolo.';
};

const isValidPhone = (phone: string): boolean => {
  const regex = /^(\d{10}|\d{0})$/;
  return !!regex.test(phone);
};

export const isPhone = (phone: string): string | undefined => {
  return isValidPhone(phone) ? undefined : 'Número de teléfono no válido';
};
