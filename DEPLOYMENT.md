# GitHub Pages Deployment Guide

## Quick Deploy

To deploy your site to GitHub Pages, run:

```bash
npm run deploy
```

This command will:
1. Build your site (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Your site will be live at `https://motobandit.net` (or your GitHub Pages URL)

## Step-by-Step Instructions

### 1. Make sure you're in the motobandit directory:
```bash
cd motobandit
```

### 2. Ensure all changes are committed:
```bash
git add .
git commit -m "Add discount code popup feature"
```

### 3. Deploy to GitHub Pages:
```bash
npm run deploy
```

This runs:
- `predeploy`: Builds the site and copies index.html to 404.html (for React Router)
- `deploy`: Deploys the `dist` folder to the `gh-pages` branch

### 4. Push your main branch (if you haven't already):
```bash
git push origin main
```

## What Happens During Deployment

1. **Build**: Vite builds your React app into the `dist` folder
2. **404.html**: A copy of index.html is created for client-side routing
3. **CNAME**: Your custom domain (motobandit.net) is preserved
4. **gh-pages branch**: The `dist` folder is pushed to the `gh-pages` branch
5. **GitHub Pages**: GitHub automatically serves your site from the `gh-pages` branch

## Troubleshooting

### If deployment fails:
- Make sure you're logged into GitHub: `git config --global user.name` and `git config --global user.email`
- Check that your repository is connected: `git remote -v`
- Ensure you have push permissions to the repository

### If the site doesn't update:
- GitHub Pages can take a few minutes to update
- Check your GitHub repository Settings → Pages to verify the deployment
- Clear your browser cache

### If you need to update the deployment:
Just run `npm run deploy` again after making changes!


