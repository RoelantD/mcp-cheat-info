# Azure Static Web Apps Deployment

This repository is configured to automatically deploy to Azure Static Web Apps using GitHub Actions.

## Setup Instructions

### 1. Create Azure Static Web App

#### Option A: Using Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Click **Create a resource** → Search for **Static Web App**
3. Fill in the details:
   - **Subscription**: Your Azure subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `mcp-cheat-info` (or your preferred name)
   - **Plan type**: Free (for personal projects)
   - **Region**: Choose closest to your audience
   - **Deployment source**: GitHub
4. Click **Sign in with GitHub** and authorize
5. Select:
   - **Organization**: Your GitHub username
   - **Repository**: mcp-cheat-info
   - **Branch**: main
6. **Build Details**:
   - **Build Presets**: Custom
   - **App location**: `/`
   - **Api location**: (leave empty)
   - **Output location**: (leave empty)
7. Click **Review + Create**, then **Create**

#### Option B: Using Azure CLI
```powershell
# Login to Azure
az login

# Create resource group
az group create --name mcp-cheat-rg --location eastus2

# Create static web app
az staticwebapp create `
  --name mcp-cheat-info `
  --resource-group mcp-cheat-rg `
  --source https://github.com/YOUR-USERNAME/mcp-cheat-info `
  --location eastus2 `
  --branch main `
  --app-location "/" `
  --login-with-github
```

### 2. Get Deployment Token

After creating the Static Web App, Azure will automatically:
1. Create a GitHub Actions workflow file (or use the existing one)
2. Add a secret called `AZURE_STATIC_WEB_APPS_API_TOKEN` to your repository

If you need to manually get the token:

#### Via Azure Portal:
1. Go to your Static Web App in Azure Portal
2. Click **Manage deployment token** (in Overview)
3. Copy the deployment token

#### Via Azure CLI:
```powershell
az staticwebapp secrets list `
  --name mcp-cheat-info `
  --resource-group mcp-cheat-rg `
  --query "properties.apiKey" `
  --output tsv
```

### 3. Add Secret to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. Value: Paste the deployment token
6. Click **Add secret**

### 4. Deploy

The workflow will automatically trigger when you:
- Push to the `main` branch
- Create or update a pull request

## How It Works

- **Push to main**: Deploys to production
- **Pull Request**: Creates a staging environment with preview URL
- **PR closed**: Removes the staging environment

## View Your Site

After deployment completes:
1. Go to Azure Portal → Your Static Web App
2. Find the **URL** in the Overview section
3. Your site will be at: `https://[random-name].azurestaticapps.net`

## Custom Domain (Optional)

1. Go to Azure Portal → Your Static Web App → **Custom domains**
2. Click **Add**
3. Follow instructions to add CNAME record to your DNS
4. Wait for DNS propagation (5-60 minutes)

## Troubleshooting

### Workflow fails
- Check GitHub Actions logs for errors
- Verify the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret is set correctly
- Ensure all files are committed to the repository

### Site shows 404
- Check that `staticwebapp.config.json` is in the root directory
- Verify `app_location` is set to `/` in the workflow

### Need to regenerate token
```powershell
az staticwebapp secrets reset `
  --name mcp-cheat-info `
  --resource-group mcp-cheat-rg
```

Then update the GitHub secret with the new token.

## Cost

Azure Static Web Apps Free Tier includes:
- ✅ 100 GB bandwidth/month
- ✅ Custom domains
- ✅ Free SSL certificates
- ✅ GitHub Actions CI/CD
- ✅ Staging environments for PRs

Perfect for personal and educational sites!

## Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions for Azure](https://github.com/Azure/actions)
- [Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/)
