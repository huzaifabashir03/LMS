# JWT Configuration Guide

## What is JWT?
JWT (JSON Web Token) is a standard for securely transmitting information between the frontend and backend. It contains:
- **Header**: Token type and algorithm
- **Payload**: User data (ID, role, etc.)
- **Signature**: Secret key signature for verification

---

## JWT Setup in This App

### 1. Secret Key
Located in `backend/.env`:
```
JWT_SECRET=95768ee1d9277e204431c6a69e4f54f985f4ead9873513ae6e14a7cec450e6bf
JWT_EXPIRE=30d
```

### 2. Token Generation
File: `backend/utils/generateToken.js`
```javascript
const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || "30d" }
);
```

### 3. Token Verification
File: `backend/middlewares/authMiddleware.js`
```javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.id);
```

### 4. Usage Flow
```
1. User logs in → Backend generates JWT
2. Token sent to frontend → Stored in localStorage
3. Frontend sends token with every API request
4. Backend verifies token → Grants access
5. Token expires after 30 days → User must login again
```

---

## Token Structure

**Encoded Token Example:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWJjZGVm..." 
```

**Decoded Payload:**
```json
{
  "id": "67abcdef123456789",
  "iat": 1748746800,
  "exp": 1751338800
}
```

---

## 🔒 Security Best Practices

✅ **Implemented:**
- Secret key is 64 characters (very secure)
- Token expires after 30 days
- Tokens verified on every protected endpoint
- Password hashed with bcryptjs

**For Production:**
- Change `JWT_SECRET` to a new value
- Use HTTPS only (not HTTP)
- Store token in httpOnly cookie (not localStorage)
- Implement refresh tokens for better security
- Add token blacklist for logout

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| "Not authorized, token failed" | Invalid/expired token | Login again |
| "JWT_SECRET undefined" | Missing .env variable | Add JWT_SECRET to .env |
| Token expires too quickly | JWT_EXPIRE too short | Increase in .env |
| Token never expires | JWT_EXPIRE not set | Add JWT_EXPIRE=30d |

---

## Files Involved

- `backend/.env` - Configuration
- `backend/config/jwt.js` - JWT settings
- `backend/utils/generateToken.js` - Token creation
- `backend/middlewares/authMiddleware.js` - Token verification
- `backend/controllers/authController.js` - Login/Signup logic
- `frontend/src/api/api.js` - Sending token with requests

---

## Test JWT Token

```bash
# Decode and inspect a token
node -e "console.log(require('jsonwebtoken').decode('YOUR_TOKEN'))"

# Generate new secret key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Reference
- [JWT.io](https://jwt.io) - Decode/verify tokens online
- [jsonwebtoken docs](https://github.com/auth0/node-jsonwebtoken)
