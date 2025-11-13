/**
 * Decodifica um token JWT sem verificar a assinatura
 * @param {string} token - Token JWT
 * @returns {object|null} - Payload decodificado ou null se inválido
 */
export const decodeToken = (token) => {
  try {
    if (!token) {
      return null;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const payload = parts[1];
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

/**
 * Verifica se um token JWT está expirado
 * @param {string} token - Token JWT
 * @returns {boolean} - true se expirado, false caso contrário
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    // exp está em segundos, Date.now() está em milissegundos
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    // Considerar expirado se faltar menos de 1 minuto
    return currentTime >= expirationTime - 60000;
  } catch (error) {
    console.error('Erro ao verificar expiração do token:', error);
    return true;
  }
};

/**
 * Verifica se um token JWT é válido (não expirado e bem formatado)
 * @param {string} token - Token JWT
 * @returns {boolean} - true se válido, false caso contrário
 */
export const isTokenValid = (token) => {
  if (!token) {
    return false;
  }
  return !isTokenExpired(token);
};
