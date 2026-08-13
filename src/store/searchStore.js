import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Search Store - Manage search state and history
 */

const useSearchStore = create(
  persist(
    (set, get) => ({
      // State
      query: '',
      filters: {
        categoria: [],
        continente: [],
        rating: [],
        ordenar: 'recentes',
      },
      recentSearches: [],
      results: [],
      loading: false,
      totalResults: 0,
      currentPage: 1,

      // Actions
      setQuery: (query) => set({ query }),

      setFilters: (filters) => set({ filters }),

      updateFilter: (key, value) => {
        const { filters } = get();
        set({ filters: { ...filters, [key]: value } });
      },

      resetFilters: () =>
        set({
          filters: {
            categoria: [],
            continente: [],
            rating: [],
            ordenar: 'recentes',
          },
        }),

      addToRecentSearches: (term) => {
        if (!term.trim()) return;

        const { recentSearches } = get();
        const filtered = recentSearches.filter((s) => s !== term);
        const updated = [term, ...filtered].slice(0, 10); // Keep last 10
        set({ recentSearches: updated });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      setResults: (results, total) =>
        set({
          results,
          totalResults: total,
        }),

      setLoading: (loading) => set({ loading }),

      setPage: (page) => set({ currentPage: page }),

      // Perform search
      search: async () => {
        const { query, filters } = get();
        set({ loading: true });

        try {
          const params = new URLSearchParams();

          if (query) params.append('q', query);
          if (filters.categoria.length) {
            filters.categoria.forEach((c) => params.append('categoria', c));
          }
          if (filters.continente.length) {
            filters.continente.forEach((c) => params.append('continente', c));
          }
          if (filters.rating.length) {
            params.append(
              'rating_min',
              Math.min(...filters.rating.map(Number)),
            );
          }
          if (filters.ordenar) {
            params.append('ordenar', filters.ordenar);
          }

          const res = await fetch(
            `/api/v1/vitrines/search?${params.toString()}`,
          );
          const data = await res.json();

          set({
            results: data.catalogos || [],
            totalResults: data.total || 0,
          });

          // Add to recent searches
          if (query) {
            get().addToRecentSearches(query);
          }
        } catch (error) {
          console.error('Search error:', error);
          set({ results: [], totalResults: 0 });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: 'b2b-connect-platform-search',
      partialize: (state) => ({
        recentSearches: state.recentSearches,
      }),
    },
  ),
);

export default useSearchStore;
