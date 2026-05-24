const data = {
  "email": "admin2@example.com",
  "Password": "password123",
  "fullName": "Admin User",
  "age": 30,
  "mobileNumber": "01012345678",
  "role": "admin"
};

fetch('http://localhost:3000/users/sign-up', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(console.log)
.catch(console.error);
