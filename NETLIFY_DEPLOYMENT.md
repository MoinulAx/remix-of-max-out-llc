# Netlify Deployment Guide for RummSpace

## Prerequisites
- GitHub account connected to your repository
- Netlify account (free tier works)
- Supabase project set up

## Step 1: Prepare Your Repository
Make sure all your code is committed and pushed to GitHub.

## Step 2: Deploy to Netlify
1. Go to [Netlify](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and authorize access
4. Select your RummSpace repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (should auto-detect from .nvmrc)

## Step 3: Environment Variables
In your Netlify dashboard, go to Site settings → Environment variables and add:

### Required for Supabase
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Note: To avoid Netlify secrets scanning false positives for these public Supabase values, set SECRETS_SCAN_OMIT_KEYS to "VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY" in Site settings → Environment variables or in netlify.toml. Also add your EmailJS env vars as documented in README-EMAILJS.md.
## Step 4: Custom Domain (Optional)
1. In Netlify dashboard, go to Domain settings
2. Click "Add custom domain"
3. Enter your domain (e.g., rummspace.com)
4. Follow DNS configuration instructions
5. Enable HTTPS (automatic with Let's Encrypt)

## Step 5: Form Handling
Your contact forms will work through:
1. **Primary**: EmailJS (client-side, immediate)
2. **Fallback**: Supabase Edge Functions (server-side, reliable)

## Step 6: Performance Optimization
The included `netlify.toml` provides:
- Proper SPA routing redirects
- Asset caching for static files
- Security headers
- Build optimization

## Continuous Deployment
Once connected, every push to your main branch will trigger a new deployment automatically.

## Troubleshooting

### Build Fails
- Check that all dependencies are in package.json
- Verify Node version is 18+
- Check build logs in Netlify dashboard

### Routing Issues
- Ensure `_redirects` file is in the `public` folder
- Check that all routes are defined in your React Router

### Environment Variables
- Make sure all VITE_ prefixed variables are set
- Check that Supabase URLs and keys are correct
- Test locally with the same environment variables

### Email Forms Not Working
- **EmailJS "recipients address is empty"**: Go to your EmailJS dashboard → Email Templates → Select your template → Settings tab → Add "TO" email address (e.g., your business email)
- Check browser console for EmailJS errors
- Verify Supabase Edge Functions are deployed
- Test email templates in EmailJS dashboard

## Monitoring
- Check Netlify Analytics for performance
- Monitor Supabase usage and logs
- Set up uptime monitoring if needed

## Cost Considerations
- Netlify: Free tier includes 100GB bandwidth/month
- Supabase: Free tier includes 500MB database, 2GB bandwidth
- EmailJS: Free tier includes 200 emails/month

Your site will be available at: `https://your-site-name.netlify.app`