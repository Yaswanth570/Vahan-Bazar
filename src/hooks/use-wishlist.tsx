import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Bike } from '@/data/bikes';
import { useAuth } from '@/hooks/use-auth';

const STORAGE_KEY = 'vahan-wishlist';

type WishlistContextType = {
  ids: string[];
  isSaved: (bikeId: string) => boolean;
  toggle: (bike: Bike) => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [ids, setIds] = useState<string[]>([]);

  const baseUrl = useMemo(() => {
    return (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';
  }, []);

  // Load from localStorage at startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setIds(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch {}
  }, [ids]);

  // Sync with server after login: pull server -> merge -> push missing to server
  useEffect(() => {
    const sync = async () => {
      if (!user) return;
      try {
        // Ensure backend user exists (idempotent create)
        const ensureUserRes = await fetch(`${baseUrl}/api/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: user.name || 'User', email: user.email, avatar: '' })
        });
        const backendUser = await ensureUserRes.json();

        // Fetch server saved
        const res = await fetch(`${baseUrl}/api/users/${backendUser._id}/saved`, {
          headers: { 'X-User-Id': backendUser._id },
        });
        const data: { bikeId: string }[] = await res.json();
        const serverIds = data.map((d) => d.bikeId);

        // Merge local + server
        setIds((local) => {
          const merged = Array.from(new Set([...(local || []), ...serverIds]));
          // Push any local-only to server to ensure DB has them
          const missing = merged.filter((id) => !serverIds.includes(id));
          missing.forEach(async (bikeId) => {
            try {
              await fetch(`${baseUrl}/api/users/${backendUser._id}/saved`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-User-Id': backendUser._id },
                body: JSON.stringify({ bikeId })
              });
            } catch {}
          });
          return merged;
        });
      } catch (e) {
        // ignore sync failure to preserve local state
      }
    };
    sync();
  }, [user, baseUrl]);

  const isSaved = (bikeId: string) => ids.includes(bikeId);

  const toggle = async (bike: Bike) => {
    const bikeId = bike.id;
    const nowSaved = !isSaved(bikeId);
    setIds((prev) => (nowSaved ? Array.from(new Set([...(prev || []), bikeId])) : (prev || []).filter((id) => id !== bikeId)));

    // Best-effort server sync
    if (!user) return;
    try {
      const ensureUserRes = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user.name || 'User', email: user.email, avatar: '' })
      });
      const backendUser = await ensureUserRes.json();

      if (nowSaved) {
        await fetch(`${baseUrl}/api/users/${backendUser._id}/saved`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-User-Id': backendUser._id },
          body: JSON.stringify({ bikeId })
        });
      } else {
        await fetch(`${baseUrl}/api/users/${backendUser._id}/saved/${bikeId}`, {
          method: 'DELETE',
          headers: { 'X-User-Id': backendUser._id },
        });
      }
    } catch {}
  };

  const value: WishlistContextType = { ids, isSaved, toggle };
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
