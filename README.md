# Freshmate - Cooking Suggestions

Freshmate helps you find recipes using ingredients you have on hand. Browse recipes, save favourites, manage your fridge ingredients, and keep a shopping list.

## Features

- Browse and view recipe details
- Find cooking ideas based on fridge ingredients
- Save favourite recipes
- Manage a shopping list

## Getting started

### Requirements

- Node.js and npm

### Install and run

```bash
npm install
npm start
```

The app runs locally at [http://localhost:3000](http://localhost:3000).

## Production build

```bash
npm run build
```

Recipes are currently provided by local sample data. Recipe photos are loaded from Unsplash.

## Deploy to GitHub Pages

The GitHub Actions workflow deploys the `main` branch automatically:

1. In the repository, open **Settings > Pages** and set the source to **GitHub Actions**.
2. Push the project to the `main` branch. The workflow installs dependencies, builds the app, and publishes the `build` folder.

The project site is available at [https://arunkumar-ak99.github.io/Cooking-Suggestions/](https://arunkumar-ak99.github.io/Cooking-Suggestions/).
