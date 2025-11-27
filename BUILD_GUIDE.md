# Static Build Guide

## Overview

This application is now configured for **SPA (Single Page Application)** mode with static generation. This is ideal for dashboards with authentication that need to be deployed to static hosting.

## What Changed

### 1. Nuxt Configuration (`nuxt.config.ts`)

- ✅ **SPA Mode**: Added `ssr: false` - All rendering happens on the client side
- ✅ **Static Preset**: Configured Nitro with `preset: 'static'` for static file generation
- ✅ **Payload Extraction**: Disabled for SPA mode (`payloadExtraction: false`)

### 2. Authentication Middleware (`app/middleware/auth.global.ts`)

- ✅ **Client-Side Only**: Middleware now only runs on the client side
- ✅ **Cookie Persistence**: Direct cookie reading ensures auth state persists on page refresh
- ✅ **No Logout on Refresh**: Token is properly read from cookies, preventing unwanted logouts

### 3. Permissions Middleware (`app/middleware/permissions.global.ts`)

- ✅ **Client-Side Only**: Middleware now only runs on the client side
- ✅ **Consistent with Auth**: Matches the auth middleware pattern

## Building Your Static Site

### Command Options

```bash
# Option 1: Use the new build:static script (recommended)
npm run build:static

# Option 2: Use the generate command
npm run generate
```

Both commands will:

1. Generate the static files in `.output/public`
2. Automatically copy them to the `dist` folder

### Output Location

After building, your static files will be located in:

```
dist/
```

This folder contains all the static assets ready for deployment.

> **Note:** Dev mode (`npm run dev`) uses the default `.nuxt` output and won't interfere with the `dist` folder.

## Testing Locally

To preview your static build locally:

```bash
npm run preview
```

This will serve the `dist` folder so you can test the built site.

## Deployment

### Deploy to Static Hosting

You can deploy the `dist` folder to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Configure build command as `npm run generate` and publish directory as `dist`
- **GitHub Pages**: Copy contents to your repository
- **AWS S3**: Upload the folder and configure as static website
- **Cloudflare Pages**: Connect your repo with build command `npm run generate`

### Important: Environment Variables

Make sure to set these environment variables in your hosting platform:

```env
API_URL=your_api_url
WHATSAPP_URL=your_whatsapp_url
X_API_KEY=your_api_key
```

## How Authentication Works Now

1. **Login**: User logs in → Token saved to cookie → Redirected to dashboard
2. **Page Refresh**: Cookie is read → Auth state restored → User stays logged in ✅
3. **Browser Close/Reopen**: Cookie persists → User still logged in ✅
4. **Logout**: Cookie cleared → Redirected to login page

## Troubleshooting

### Issue: Still getting logged out after refresh

**Solution**: Clear your browser cookies and try logging in again. Old cookies might be causing conflicts.

### Issue: API calls failing in production

**Solution**: Ensure your environment variables are properly set in your hosting platform.

### Issue: 404 errors on refresh in production

**Solution**: Configure your hosting to redirect all routes to `index.html`:

- **Netlify**: Add `_redirects` file with `/* /index.html 200`
- **Vercel**: This is handled automatically
- **Nginx**: Add `try_files $uri $uri/ /index.html;`

## Build Size Optimization (Optional)

To further optimize your build:

```bash
# Analyze bundle size
npm run generate -- --analyze

# Build for production (minified)
NODE_ENV=production npm run generate
```

## Summary

✅ **SPA Mode**: Fast, client-side rendered application
✅ **Static Build**: Can be deployed anywhere
✅ **Auth Persistence**: No more logout on refresh
✅ **Middleware Fixed**: Works correctly with cookies
✅ **Ready to Deploy**: Build and upload the `dist` folder

## Next Steps

1. Run `npm run build:static` to generate your static files
2. Test locally with `npm run preview`
3. Deploy the `dist` folder to your preferred hosting
4. Configure environment variables on your hosting platform
5. Set up redirects for SPA routing if needed

Happy deploying! 🚀
