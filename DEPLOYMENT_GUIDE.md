# Deployment Guide for Platforms Without Environment Variables

## For Famous AI and Similar Platforms

Since Famous AI doesn't support environment variable separation, here's how to handle secure deployment:

### 1. **Current Setup (Acceptable for Famous AI)**
- Hardcoded values in `envConfig.ts` with fallback system
- Public keys only (Supabase anon key is safe to expose)
- Environment detection based on domain

### 2. **Security Considerations**

**✅ SAFE to hardcode:**
- Supabase URL (public)
- Supabase Anon Key (public, row-level security protects data)
- Stripe Publishable Key (public)

**❌ NEVER hardcode:**
- Supabase Service Role Key
- Stripe Secret Key
- Database passwords
- JWT secrets

### 3. **Deployment Steps**

1. **Update Production URLs**
   ```typescript
   allowedOrigins: [
     'https://your-famous-ai-domain.com',
     'https://acclounge.org'
   ]
   ```

2. **Secure Backend Secrets**
   - Keep sensitive keys in Supabase dashboard only
   - Use Supabase Edge Functions for server-side operations
   - Never expose service role keys to frontend

3. **Test Security**
   - Verify RLS policies work
   - Test CORS settings
   - Confirm rate limiting

### 4. **Alternative Solutions**

If you need true environment separation:
- **Vercel/Netlify**: Full env var support
- **Railway**: Environment-based deployments  
- **Render**: Supports .env files

### 5. **Current Security Status**
- ✅ Frontend keys properly exposed
- ✅ Backend secrets protected in Supabase
- ✅ CORS configured correctly
- ✅ Rate limiting implemented

**Your current setup is SECURE for Famous AI deployment!**