const TOKEN_KEY = 'token';

/**
 * 
 * Message Notification
 */
const MISS_FIELD_FORM = 'Vui lòng điền đầy đủ thông tin';
const WRONG_FORMAT_PHONE = "Số điện thoại sai định dạng"

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export { getToken, MISS_FIELD_FORM, WRONG_FORMAT_PHONE };
