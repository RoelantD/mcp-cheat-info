# MCP Cheat Info

![MCP Cheat Info](https://img.shields.io/badge/MCP-Cheat%20Sheet-red?style=for-the-badge)
![Azure Static Web Apps](https://img.shields.io/badge/Azure-Static%20Web%20Apps-blue?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple?style=for-the-badge)

> 🎴 Your Pokémon-Style Model Context Protocol Cheat Sheet Reference

## 🎮 About

This website serves as an interactive cheat sheet for understanding the **Model Context Protocol (MCP)** through a fun Pokémon analogy! Created for educational sessions, it helps developers grasp MCP concepts by comparing them to familiar Pokémon game mechanics.

## ⚡ The Pokémon Analogy

- **Player** = Host (IDE/Application)
- **Pokéball** = Client (Connection Manager)
- **Pokémon** = MCP Server (Capability Provider)
- **Moves** = Tools/Resources (Actions)

## 🚀 Features

- ✅ Responsive Bootstrap 5 design
- ✅ Pokémon-themed color scheme and animations
- ✅ Interactive card components with hover effects
- ✅ Comprehensive MCP reference guide
- ✅ Mobile-friendly layout
- ✅ Smooth scroll animations
- ✅ Easter egg: Konami code activation
- ✅ Azure Static Web Apps ready

## 📦 What's Included

```
mcp-cheat-info/
├── index.html              # Main HTML page
├── styles.css              # Custom Pokemon-themed styles
├── script.js               # Interactive JavaScript features
├── staticwebapp.config.json # Azure Static Web Apps configuration
└── README.md               # This file
```

## 🛠️ Local Development

Simply open `index.html` in your browser, or use a local server:

```powershell
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## ☁️ Deploy to Azure Static Web Apps

### Option 1: Azure Portal
1. Push this repo to GitHub
2. Go to [Azure Portal](https://portal.azure.com)
3. Create a new **Static Web App**
4. Connect to your GitHub repository
5. Set build details:
   - **App location**: `/`
   - **Api location**: (leave empty)
   - **Output location**: (leave empty)

### Option 2: Azure CLI
```powershell
# Login to Azure
az login

# Create resource group (if needed)
az group create --name mcp-cheat-rg --location eastus

# Create static web app
az staticwebapp create `
  --name mcp-cheat-info `
  --resource-group mcp-cheat-rg `
  --source https://github.com/YOUR-USERNAME/mcp-cheat-info `
  --location eastus `
  --branch main `
  --app-location "/" `
  --login-with-github
```

### Option 3: GitHub Actions (Automated)
The Azure Static Web Apps deployment will automatically create a GitHub Actions workflow for CI/CD.

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --pokemon-red: #EE1515;
    --pokemon-blue: #3B4CCA;
    --pokemon-yellow: #FFDE00;
    /* ... add your custom colors */
}
```

### Content
Modify sections in `index.html`:
- Hero section
- Analogy cards
- MCP reference cards
- Key concepts

## 🎯 MCP Concepts Covered

- **Architecture**: Host, Client, Server relationship
- **Tools**: Callable functions exposed by servers
- **Resources**: Data/content access patterns
- **Prompts**: Reusable template system
- **Communication**: JSON-RPC protocol
- **Security**: Permission and sandboxing model
- **Lifecycle**: Initialize, ready, shutdown phases

## 🐛 Easter Eggs

Try the **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A

## 📄 License

This project is created for educational purposes as part of MCP training sessions.

## 🤝 Contributing

Feel free to fork and customize for your own MCP sessions!

## 📞 Contact

Created for the MCP community with ❤️

---

**Gotta Understand 'Em All!** ⚡
