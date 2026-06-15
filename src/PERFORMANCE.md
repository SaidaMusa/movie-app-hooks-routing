# Performance Optimization Report

## Overview

This document records profiling results for the React movie application before and after performance optimizations.

The goal was to identify rendering bottlenecks using React DevTools Profiler and improve performance using memoization, virtualization, and caching techniques.

---

# Phase 1 — Initial Profiling (Baseline)

## Methodology

- React DevTools Profiler used
- Each interaction recorded separately
- Metrics collected: commit duration, render count, flame chart

---

## Interaction 1 — Searching for a movie

- Commits: 6
- Avg commit duration: ~18 ms
- Worst commit duration: ~24 ms
- Re-rendered components: 12–15

### Observations
- Entire component tree re-rendered on each keystroke
- MovieList and MovieCard re-rendered unnecessarily
- Pagination and Flyout also re-rendered

---

## Interaction 2 — Changing page

- Commits: 2
- Avg commit duration: ~22 ms
- Worst commit duration: ~31 ms
- Re-renders: 14–18 components

### Observations
- Pagination handler recreated every render
- Full movie list re-rendered during page transition

---

## Interaction 3 — Selecting a movie

- Commits: 1
- Commit duration: ~16 ms
- Re-renders: 20 components

### Observations
- Zustand state update caused full list re-render
- Only one item should re-render but all re-rendered

---

## Interaction 4 — Flyout toggle

- Commits: 2
- Commit duration: ~14 ms
- Re-renders: 8–10 components

### Observations
- Flyout state update triggered parent re-render
- Movie list re-rendered unnecessarily

---

# Phase 2 — Optimizations Applied

## React.memo
- MovieCard
- MovieList
- SearchBar
- Pagination
- Flyout

## useCallback
- handleSearch
- handlePageChange
- handleRefresh
- closeDetails

## useMemo
- page
- search
- isDetailsOpen

## Other Optimizations
- react-window virtualization for large list rendering
- stable keys using movie.id
- image lazy loading
- API caching via staleTime (5 minutes)

---

# Phase 3 — Final Results

## Search
- Improvement: ~67% faster commit time
- Re-renders reduced by ~87%

## Pagination
- Improvement: ~59% faster
- Re-renders reduced by ~75%

## Movie Selection
- Improvement: ~81% faster
- Re-renders reduced by ~95%

## Flyout Toggle
- Improvement: ~71% faster
- Re-renders reduced by ~80%

---

# Conclusion

The application performance was significantly improved through:

- Memoization (React.memo, useMemo, useCallback)
- Virtualized rendering (react-window)
- Stable state handling and event handlers
- API caching strategies

Result: fewer re-renders, faster commits, and smoother UI experience.
