# Deployment Guide

This guide explains how to deploy the Body Measurement App using various platforms.

## Vercel Deployment (Recommended)

### Option 1: Vercel CLI (Quick)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Choose your GitHub repository
   - Set project name (e.g., `body-measurement-app`)

### Option 2: Vercel Dashboard (GitHub Integration)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Import your repository**: `Tomlytm/body-measurement-app`
4. **Configure build settings**:
   - Framework Preset: `Create React App`
   - Build Command: `yarn build`
   - Output Directory: `build`
   - Install Command: `yarn install`
5. **Add Environment Variables**:
   - `NODE_OPTIONS`: `--openssl-legacy-provider`
6. **Deploy**

### Production URL
After deployment, Vercel will provide a URL like:
- `https://body-measurement-app-username.vercel.app`

## Netlify Deployment

### Option 1: Drag & Drop

1. **Build the project locally**:
   ```bash
   yarn build
   ```

2. **Go to [netlify.com](https://netlify.com)**
3. **Drag the `build` folder** to the deploy area

### Option 2: GitHub Integration

1. **Create `netlify.toml`** (already configured):
   ```toml
   [build]
     command = "yarn build"
     publish = "build"

   [build.environment]
     NODE_OPTIONS = "--openssl-legacy-provider"
     NODE_VERSION = "16"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Connect GitHub repo** in Netlify dashboard
3. **Deploy automatically** on every push

## GitHub Pages Deployment

1. **Install gh-pages**:
   ```bash
   yarn add --dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   {
     "homepage": "https://tomlytm.github.io/body-measurement-app",
     "scripts": {
       "predeploy": "yarn build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**:
   ```bash
   yarn deploy
   ```

4. **Enable GitHub Pages** in repository settings

## Docker Deployment

### Build Docker Image

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:16-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN yarn install
   COPY . .
   RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**:
   ```nginx
   events { worker_connections 1024; }
   http {
     include /etc/nginx/mime.types;
     server {
       listen 80;
       root /usr/share/nginx/html;
       index index.html;
       add_header Permissions-Policy "camera=*";
       location / {
         try_files $uri $uri/ /index.html;
       }
     }
   }
   ```

3. **Build and run**:
   ```bash
   docker build -t body-measurement-app .
   docker run -p 80:80 body-measurement-app
   ```

## Environment Configuration

The following files have been configured for deployment:

### `.env.production`
- Disables source maps for security
- Sets Node.js options for legacy OpenSSL
- Defines app version

### `vercel.json`
- Configures static build process
- Sets up routing for SPA
- Enables camera permissions
- Optimizes caching for static assets

### `public/index.html`
- Updated with proper meta tags
- Camera permissions policy
- Browser compatibility checks
- SEO-friendly title and description

## Post-Deployment Checklist

1. **Test camera access** - Ensure HTTPS is working
2. **Check performance** - Verify WebGL acceleration
3. **Test on mobile** - Ensure responsive design works
4. **Monitor errors** - Check browser console for issues
5. **Verify models load** - Ensure TensorFlow.js models download correctly

## Troubleshooting

### Common Issues

1. **Build fails with OpenSSL error**:
   - Ensure `NODE_OPTIONS=--openssl-legacy-provider` is set
   - Use Node.js v16 or v14

2. **Camera access denied**:
   - Verify HTTPS is enabled
   - Check browser permissions
   - Ensure proper meta tags are set

3. **Models fail to load**:
   - Check network connectivity
   - Verify CDN access for TensorFlow.js models
   - Check browser console for CORS errors

4. **Poor performance**:
   - Verify WebGL is enabled
   - Check for hardware acceleration
   - Ensure latest browser version

### Performance Optimization

- **Enable gzip compression** (automatic on Vercel/Netlify)
- **Use CDN** for model loading (TensorFlow.js handles this)
- **Monitor bundle size** with webpack-bundle-analyzer
- **Lazy load models** for faster initial page load

## Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Netlify
1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS or use Netlify DNS

## Security Considerations

- **HTTPS is mandatory** for camera access
- **No sensitive data** is transmitted (all processing is local)
- **Camera permissions** are properly configured
- **Source maps disabled** in production for security

## Monitoring

### Recommended monitoring tools:
- **Vercel Analytics** (built-in)
- **Google Analytics** (add to public/index.html)
- **Sentry** for error tracking
- **LogRocket** for user session recording

The app is now ready for production deployment with optimized performance and proper security configurations!