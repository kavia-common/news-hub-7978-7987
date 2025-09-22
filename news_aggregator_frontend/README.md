# News Hub — Ocean Professional (React)

A bold, dark-themed news aggregator frontend built with React. It integrates with a free public news API to provide:
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

No configuration or API key needed for basic usage. The app uses the public GNews demo key by default.

## Environment variables (optional)

You can optionally provide your own GNews API key for higher limits:
- `REACT_APP_GNEWS_API_KEY` (optional): Your GNews API key. Defaults to `demo`.
- `REACT_APP_GNEWS_API_BASE_URL` (optional): Defaults to `https://gnews.io/api/v4`.
- `REACT_APP_SITE_URL` (optional): Used in footer links for social sharing.

## API notes

- Default backend: GNews (https://gnews.io/docs/v4) using the public `demo` key for zero-configuration.
- Endpoints used: `/top-headlines` for headlines and categories, `/search` for keyword search.
- Categories supported: general, world, nation, business, technology, entertainment, sports, science, health.
- The public demo key is intended for testing and has rate/feature limits. For production-grade usage, set `REACT_APP_GNEWS_API_KEY` in a `.env` file.

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

Please review GNews usage terms and limits. This project uses their public endpoints for demonstration purposes.
