import { create } from 'zustand';
import { type SmartLock } from '@prisma/client';

type LockState = {
  locks: SmartLock[];
  toggleLock: (lockId: number) => void;
  setLock: (updatedLock: SmartLock) => void;
  setLocks: (locks: SmartLock[]) => void;
  addLock: (newLock: SmartLock) => void;
  removeLock: (lockId: number) => void;
};

export const useLockStore = create<LockState>()((set) => ({
  locks: [],
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
}));
