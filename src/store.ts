import { create } from 'zustand';
import { type SmartLock } from '~/db/schema/smart-locks';

type LockState = {
  locks: SmartLock[];
  actions: {
    toggleLock: (id: string) => void;
    setLock: (updatedLock: SmartLock) => void;
    setLocks: (locks: SmartLock[]) => void;
    addLock: (lock: SmartLock) => void;
    removeLock: (id: string) => void;
  };
};

export const useLockStore = create<LockState>()((set) => ({
  locks: [],
  actions: {
    toggleLock: (id) =>
      set((state) => ({
        locks: state.locks.map((lock) =>
          lock.id === id ? { ...lock, locked: !lock.locked } : lock
        )
      })),
    setLock: (updatedLock) =>
      set((state) => ({
        locks: state.locks.map((lock) =>
          lock.id === updatedLock.id ? { ...updatedLock } : lock
        )
      })),
    setLocks: (locks) =>
      set((_) => ({
        locks: locks
      })),
    addLock: (newLock) =>
      set((state) => ({
        locks: [...state.locks, newLock]
      })),
    removeLock: (lockId) =>
      set((state) => ({
        locks: state.locks.filter((lock) => lock.id !== lockId)
      }))
  }
}));
