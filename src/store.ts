import { create } from 'zustand';
import { type SmartLock } from '@prisma/client';

type LockState = {
  locks: SmartLock[];
  setLocks: (locks: SmartLock[]) => void;
  addLock: (newLock: SmartLock) => void;
  removeLock: (lockId: number) => void;
};

export const useLockStore = create<LockState>()((set) => ({
  locks: [],
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
