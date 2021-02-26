const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export default function isPasswordStrong(value) {
  return regex.test(value);
}