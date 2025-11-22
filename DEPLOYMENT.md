# Deployment Guide for Azure Static Web Apps

## Prerequisites
- Azure account ([Get free account](https://azure.microsoft.com/free/))
- GitHub account
- Azure CLI (optional)

## Deployment Methods

### Method 1: Azure Portal (Recommended for beginners)

1. **Push to GitHub**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit: MCP Cheat Info website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/mcp-cheat-info.git
   git push -u origin main
   ```

2. **Create Static Web App**
   - Go to [Azure Portal](https://portal.azure.com)
   - Click "Create a resource"
   - Search for "Static Web App"
   - Click "Create"

3. **Configure Settings**
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `mcp-cheat-info` (or your preferred name)
   - **Plan type**: Free (for personal projects)
   - **Region**: Choose closest to your audience
   - **Source**: GitHub
   - **GitHub Account**: Authorize Azure to access
   - **Organization**: Your GitHub username
   - **Repository**: mcp-cheat-info
   - **Branch**: main

4. **Build Details**
   - **Build Presets**: Custom
   - **App location**: `/`
   - **Api location**: (leave empty)
   - **Output location**: (leave empty)

5. **Review + Create**
   - Review settings
   - Click "Create"
   - Wait for deployment (2-3 minutes)

6. **Access Your Site**
   - Once deployed, Azure provides a URL like: `https://happy-beach-123456.azurestaticapps.net`
   - You can configure a custom domain later

### Method 2: Azure CLI

```powershell
# Install Azure CLI if not already installed
# Download from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login to Azure
az login

# Create resource group
az group create `
  --name mcp-cheat-rg `
  --location eastus2

# Create static web app
az staticwebapp create `
  --name mcp-cheat-info `
  --resource-group mcp-cheat-rg `
  --source https://github.com/YOUR-USERNAME/mcp-cheat-info `
  --location eastus2 `
  --branch main `
  --app-location "/" `
  --login-with-github

# Get the URL
az staticwebapp show `
  --name mcp-cheat-info `
  --resource-group mcp-cheat-rg `
  --query "defaultHostname" `
  --output tsv
```

### Method 3: VS Code Extension

1. Install [Azure Static Web Apps extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)
2. Open project in VS Code
3. Click Azure icon in sidebar
4. Sign in to Azure
5. Right-click "Static Web Apps"
6. Select "Create Static Web App..."
7. Follow prompts

## Post-Deployment

### Configure Custom Domain

1. Go to your Static Web App in Azure Portal
2. Click "Custom domains" in left menu
3. Click "Add"
4. Follow instructions to add CNAME record to your DNS
5. Wait for DNS propagation (5-60 minutes)

### Environment Variables (if needed)

```powershell
az staticwebapp appsettings set `
  --name mcp-cheat-info `
  --setting-names KEY1=value1 KEY2=value2
```

### View Deployment Status

- GitHub Actions tab in your repository
- Azure Portal > Static Web App > Deployments

### Update Website

Simply push changes to GitHub:
```powershell
git add .
git commit -m "Update content"
git push
```

GitHub Actions will automatically rebuild and deploy!

## Troubleshooting

### Issue: Deployment fails
- Check GitHub Actions logs
- Verify `staticwebapp.config.json` is valid JSON
- Ensure all files are committed

### Issue: 404 errors
- Check `staticwebapp.config.json` navigation fallback
- Verify file paths are correct

### Issue: Styling not working
- Clear browser cache
- Check CSS file path in index.html
- Verify files are in correct location

## Monitoring

### View Analytics
- Azure Portal > Static Web App > Metrics
- Monitor requests, errors, bandwidth

### View Logs
```powershell
az staticwebapp logs show `
  --name mcp-cheat-info `
  --resource-group mcp-cheat-rg
```

## Cost

Azure Static Web Apps Free Tier includes:
- ✅ 100 GB bandwidth/month
- ✅ Custom domains
- ✅ Free SSL certificates
- ✅ GitHub Actions CI/CD

Perfect for educational and portfolio sites!

## Clean Up

To delete resources:
```powershell
# Delete Static Web App
az staticwebapp delete `
  --name mcp-cheat-info `
  --resource-group mcp-cheat-rg

# Delete Resource Group (deletes everything)
az group delete --name mcp-cheat-rg
```

## Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [GitHub Actions for Azure](https://github.com/Azure/actions)
- [Custom Domains Guide](https://docs.microsoft.com/azure/static-web-apps/custom-domain)

---

🚀 Happy Deploying!
