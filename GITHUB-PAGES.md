# POS Maju GitHub Pages

This website is configured for the repository `uksoftware2u/WEBPOSMAJU` and will be published under:

`https://uksoftware2u.github.io/WEBPOSMAJU/`

## First-time GitHub setting

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Push the `master` or `main` branch, or manually run **Deploy POS Maju Website to GitHub Pages** from the Actions tab.

The workflow installs dependencies, builds the optimized Vite website with the `/WEBPOSMAJU/` base path, uploads it as a Pages artifact, and deploys it.

## Local GitHub Pages build check

PowerShell:

```powershell
$env:VITE_BASE_PATH='/WEBPOSMAJU/'
npm run build:pages
Remove-Item Env:VITE_BASE_PATH
```

The generated website is in `dist/client`.
