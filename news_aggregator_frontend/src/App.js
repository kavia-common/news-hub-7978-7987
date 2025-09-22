import React, { useEffect, useMemo, useState } from 'react';
import './theme.css';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArticleCard from './components/ArticleCard';
import Footer from './components/Footer';
import { fetchTopHeadlines, searchEverything, fetchCategory } from './services/newsApi';
import { getBookmarks, toggleBookmark } from './utils/storage';

// PUBLIC_INTERFACE
function App() {
  /**
   * This is the main News Hub app. It renders:
   * - Header with search and bookmarks shortcut
   * - Sidebar with categories
   * - Main content area with article cards
   * - Footer with social links
   *
   * Features:
   * - Top headlines (default)
   * - Category filter
   * - Search by keyword
   * - Bookmarking via localStorage
   * - Social sharing
   *
   * No authentication required.
   */

  // UI state
  const [category, setCategory] = useState('general');
  const [mode, setMode] = useState('headlines'); // 'headlines' | 'search' | 'bookmarks'
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // Data state
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  // UX state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Derived heading
  const heading = useMemo(() => {
    if (mode === 'bookmarks') return 'Bookmarked Articles';
    if (mode === 'search') return `Search: "${query}"`;
    return `Top Headlines — ${category[0].toUpperCase()}${category.slice(1)}`;
  }, [mode, query, category]);

  const performFetch = async () => {
    try {
      setLoading(true);
      setError('');
      let data;
      if (mode === 'bookmarks') {
        const items = getBookmarks();
        setArticles(items);
        setTotalResults(items.length);
        return;
      }
      if (mode === 'search') {
        if (!query) {
          setArticles([]);
          setTotalResults(0);
          return;
        }
        data = await searchEverything({ q: query, page, pageSize: 20 });
      } else {
        data = await fetchCategory(category, { page, pageSize: 20 });
      }
      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
    } catch (e) {
      setError(e.message || 'Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, category, query, page]);

  const onSelectCategory = (cat) => {
    setCategory(cat);
    setMode('headlines');
    setPage(1);
  };

  const onSearch = (q) => {
    setQuery(q);
    setMode('search');
    setPage(1);
  };

  const onShowBookmarks = () => {
    setMode('bookmarks');
    setPage(1);
  };

  const onBookmark = (article) => {
    const { added } = toggleBookmark(article);
    // If currently in bookmarks mode or want instant visual feedback, re-render
    if (mode === 'bookmarks' || added) {
      performFetch();
    } else {
      // force re-render so ArticleCard reads updated isBookmarked()
      setArticles((prev) => [...prev]);
    }
  };

  const nextPage = () => {
    const maxPage = Math.ceil((totalResults || 0) / 20);
    if (page < maxPage) setPage(p => p + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage(p => p - 1);
  };

  return (
    <div className="container-app">
      <Header onSearch={onSearch} onShowBookmarks={onShowBookmarks} />
      <Sidebar current={category} onSelect={onSelectCategory} />
      <main className="app-main">
        <div className="toolbar">
          <div className="toolbar-title">{heading}</div>
          <div className="badge">Results: {totalResults}</div>
        </div>

        {loading && <div className="state">Loading latest news…</div>}
        {error && <div className="state" role="alert">Error: {error}</div>}
        {!loading && !error && articles.length === 0 && (
          <div className="state">No articles found.</div>
        )}

        {!loading && !error && articles.length > 0 && (
          <>
            <section className="grid" aria-live="polite">
              {articles.map((article) => (
                <ArticleCard key={article.url} article={article} onBookmark={onBookmark} />
              ))}
            </section>
            {mode !== 'bookmarks' && (
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                <button className="btn" onClick={prevPage} disabled={page <= 1} aria-disabled={page <= 1}>
                  Previous
                </button>
                <div className="badge">Page {page}</div>
                <button className="btn" onClick={nextPage}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
