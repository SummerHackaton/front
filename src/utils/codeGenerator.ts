// utils/codeGenerator.ts
export const generateRandomCode = (length: number): string => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluye caracteres ambiguos
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    // Agregar guiones cada 4 caracteres
    if ((i + 1) % 4 === 0 && i !== length - 1) {
      result += '-';
    }
  }

  return result;
};