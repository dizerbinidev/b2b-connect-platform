import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Favorites Store - Zustand with localStorage persistence
 *
 * Features:
 * - Persist favorites to localStorage
 * - Sync with API when user is logged in
 * - Optimistic updates
 */

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      // State
      favorites: [], // Array of { id, type: 'catalogo' | 'produto', catalogoId?, produtoId?, createdAt }
      loading: false,
      synced: false,

      // Actions
      addFavorite: async (type, itemId) => {
        const item = {
          id: `temp-${Date.now()}`,
          type,
          catalogoId: type === 'catalogo' ? itemId : null,
          produtoId: type === 'produto' ? itemId : null,
          createdAt: new Date().toISOString(),
        };

        // Optimistic update
        set((state) => ({
          favorites: [...state.favorites, item],
        }));

        // Sync with API
        try {
          const res = await fetch('/api/v1/favoritos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Important: send cookies
            body: JSON.stringify({
              catalogoId: type === 'catalogo' ? itemId : undefined,
              produtoId: type === 'produto' ? itemId : undefined,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            // Update with real ID from server
            set((state) => ({
              favorites: state.favorites.map((f) =>
                f.id === item.id ? { ...f, id: data.favorito.id } : f,
              ),
            }));
          }
        } catch (error) {
          console.error('Error syncing favorite:', error);
        }
      },

      removeFavorite: async (type, itemId) => {
        const favorites = get().favorites;
        const favorite = favorites.find(
          (f) =>
            (type === 'catalogo' && f.catalogoId === itemId) ||
            (type === 'produto' && f.produtoId === itemId),
        );

        if (!favorite) return;

        // Optimistic update
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== favorite.id),
        }));

        // Sync with API
        try {
          await fetch(`/api/v1/favoritos/${favorite.id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
        } catch (error) {
          console.error('Error removing favorite:', error);
          // Rollback on error
          set((state) => ({
            favorites: [...state.favorites, favorite],
          }));
        }
      },

      toggleFavorite: async (type, itemId) => {
        const isFav = get().isFavorite(type, itemId);
        if (isFav) {
          await get().removeFavorite(type, itemId);
        } else {
          await get().addFavorite(type, itemId);
        }
      },

      isFavorite: (type, itemId) => {
        return get().favorites.some(
          (f) =>
            (type === 'catalogo' && f.catalogoId === itemId) ||
            (type === 'produto' && f.produtoId === itemId),
        );
      },

      getFavoritesByType: (type) => {
        return get().favorites.filter((f) => f.type === type);
      },

      // Sync from API
      syncFromAPI: async () => {
        set({ loading: true });
        try {
          const res = await fetch('/api/v1/favoritos', {
            cache: 'no-store',
            credentials: 'include',
          });
          if (res.ok) {
            const data = await res.json();
            const favorites = (data.favoritos || []).map((f) => ({
              id: f.id,
              type: f.catalogo_id ? 'catalogo' : 'produto',
              catalogoId: f.catalogo_id,
              produtoId: f.produto_id,
              createdAt: f.created_at,
            }));
            set({ favorites, synced: true });
          }
        } catch (error) {
          console.error('Error syncing favorites from API:', error);
        } finally {
          set({ loading: false });
        }
      },

      clearFavorites: () => {
        set({ favorites: [], synced: false });
      },
    }),
    {
      name: 'b2b-connect-platform-favorites',
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);

export default useFavoritesStore;
