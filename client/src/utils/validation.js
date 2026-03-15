export const validateUser = (user) => {

  const errors = {}

  if (!user.username)
    errors.username = "Username required"

  if (!user.email)
    errors.email = "Email required"

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (user.email && !emailRegex.test(user.email))
    errors.email = "Invalid email"

  return errors
}