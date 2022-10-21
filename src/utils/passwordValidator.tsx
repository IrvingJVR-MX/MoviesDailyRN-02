export default function passwordValidator(password) {
    if (!password) return "Password can't be empty."
    if (password.length < 4) return 'Password must be at least 5 characters long.'
    return ''
  }
  