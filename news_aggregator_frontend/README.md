# News Hub — Ocean Professional (React)

A bold, dark-themed news aggregator frontend built with React. It integrates with the GNews API to provide:
- Top headlines
- Category filtering
- Keyword search
- Bookmarking (localStorage)
- Social sharing
- No authentication required (works out of the box)

## Quick start

1) Install dependencies:
```
npm install
```

2) Run the development server:
```
npm start
```

3) Open the app at http://localhost:3000

No configuration or API key needed for basic usage.
By default, the app uses the provided GNews API key: `25e269348ded27d9bf00f28bfca0445a`.

## Environment variables (optional)

You can optionally provide your own GNews API key for higher limits or your own quota:
- `REACT_APP_GNEWS_API_KEY` (optional): Your GNews API key. Defaults to `25e269348ded27d9bf00f28bfca0445a` if not set.
- `REACT_APP_GNEWS_API_BASE_URL` (optional): Defaults to `https://gnews.io/api/v4`.
- `REACT_APP_SITE_URL` (optional): Used in footer links for social sharing.

To override the default key, create a `.env` file in this folder with:
```
REACT_APP_GNEWS_API_KEY=your_own_key_here
```
Restart the dev server after changing env vars.

## API notes

- Default backend: GNews (https://gnews.io/docs/v4) using the provided default key for zero-configuration.
- Endpoints used: `/top-headlines` for headlines and categories, `/search` for keyword search.
- Categories supported: general, world, nation, business, technology, entertainment, sports, science, health.
- The provided default key is shared and may have rate/feature limits. For production-grade usage, set `REACT_APP_GNEWS_API_KEY` in a `.env` file to your own key.

## Features and usage

- Header: brand, search bar, and Bookmarks button.
- Sidebar: category filters (general, business, entertainment, health, science, sports, technology).
- Main: article cards with Read, Bookmark, and Share actions.
- Footer: quick social links.

Bookmarks are stored in browser localStorage and never leave your device.

## Styling

The UI follows the "Ocean Professional" bold theme:
- Dark background with high contrast surfaces.
- Primary (Orange #F97316) and Secondary (Green #10B981) accents.
- Strong typography and rounded corners.

All theme styles are defined in `src/theme.css`.

## License

Please review GNews usage terms and limits.
