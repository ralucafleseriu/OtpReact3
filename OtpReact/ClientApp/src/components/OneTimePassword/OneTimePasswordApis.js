export async function validatePassword(userId, password) {
  const response = await fetch('onetimepassword/validate/' + password, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userId)
  });
  return await response.json();
}

export async function generatePassword() {
  const response = await fetch('onetimepassword');
  return await response.json();
}