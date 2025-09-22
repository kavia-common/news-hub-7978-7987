# News Hub — Ocean Professional (React)

A bold, dark-themed news aggregator frontend built with React. It integrates with NewsAPI.org to provide:
- Top headlines
- Category filtering
- Keyword search
- Bookmarking (localStorage)
- Social sharing
- No authentication required

## Quick start

1) Install dependencies:
```
npm install
```

2) Configure environment:
- Copy `.env.example` to `.env` and set your NewsAPI key:
```
cp .env.example .env
# edit .env to set REACT_APP_NEWS_API_KEY
```

3) Run the development server:
```
npm start
```

4) Open the app at http://localhost:3000

## Environment variables

- `REACT_APP_NEWS_API_KEY` (required): Your NewsAPI.org API key.
- `REACT_APP_NEWS_API_BASE_URL` (optional): Defaults to `https://newsapi.org/v2`.
- `REACT_APP_SITE_URL` (optional): Used in footer links for social sharing.

Note: NewsAPI free plan may block CORS on browser requests. If you encounter CORS errors,
you can use a simple development proxy (e.g., set up a small server) or enable a CORS proxy.

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

This project uses NewsAPI.org. Review their terms for usage restrictions.
