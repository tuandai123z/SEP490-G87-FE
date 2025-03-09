const TOKEN_KEY = 'token';

/**
 * 
 * 
 */
const MISS_FIELD_FORM = 'Vui lòng điền đầy đủ thông tin';

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export { getToken, MISS_FIELD_FORM };
