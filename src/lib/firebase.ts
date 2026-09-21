import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfigJson from '../../firebase-applet-config.json';
import { CloudUserGameData, TelegramWebAppUser } from '../types';

export type { CloudUserGameData };

const firebaseConfig = {
  apiKey: firebaseConfigJson.apiKey,
  authDomain: firebaseConfigJson.authDomain,
  projectId: firebaseConfigJson.projectId,
  storageBucket: firebaseConfigJson.storageBucket,
  messagingSenderId: firebaseConfigJson.messagingSenderId,
  appId: firebaseConfigJson.appId,
  measurementId: firebaseConfigJson.measurementId || undefined
};

// Initialize or retrieve Firebase app
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore (with databaseId if defined)
export const db = firebaseConfigJson.firestoreDatabaseId && firebaseConfigJson.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfigJson.firestoreDatabaseId)
  : getFirestore(app);

// Error Handling conforming to Firebase Skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection as required by Firebase skill
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection: client appears offline.');
    }
  }
}

/**
 * Creates default new player state isolated at 0 balance, max energy, 0 profit/hr
 */
export function buildDefaultUserGameData(
  userId: string,
  extra: {
    telegramId?: string;
    username?: string;
    firstName?: string;
    displayName?: string;
    email?: string;
    photoURL?: string;
  }
): CloudUserGameData {
  return {
    userId,
    telegramId: extra.telegramId || '',
    username: extra.username || '',
    firstName: extra.firstName || '',
    displayName: extra.displayName || (extra.firstName ? extra.firstName : 'Setri Miner'),
    email: extra.email || '',
    photoURL: extra.photoURL || '',
    balance: 0,
    energy: 1000,
    profitPerHour: 0,
    totalTaps: 0,
    totalEarned: 0,
    lastSaved: Date.now(),
    lastEnergyUpdate: Date.now(),
    upgrades: {
      multitapLevel: 1,
      energyLimitLevel: 1,
      autoBotLevel: 1
    },
    tasks: [],
    dailyStreak: {
      streakDay: 1,
      lastClaimDate: ''
    },
    wallet: {
      connected: false,
      address: '',
      tonBalance: 0,
      provider: ''
    },
    friends: [],
    dailyFreeRefills: 3,
    dailyFreeTurbos: 3,
    updatedAt: Date.now()
  };
}

/**
 * Loads or initializes isolated user document for Telegram WebApp users
 * Uses user Telegram ID as the unique primary key: "tg_{id}"
 */
export async function loadOrCreateTelegramUserGameData(tgUser: TelegramWebAppUser): Promise<CloudUserGameData> {
  const userId = `tg_${tgUser.id}`;
  const userRef = doc(db, 'users', userId);

  try {
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const existingData = snap.data() as CloudUserGameData;
      // Re-hydrate missing defaults if schema evolved
      return {
        ...existingData,
        userId,
        telegramId: String(tgUser.id),
        username: tgUser.username || existingData.username || '',
        firstName: tgUser.first_name || existingData.firstName || '',
        displayName: existingData.displayName || `${tgUser.first_name}${tgUser.last_name ? ' ' + tgUser.last_name : ''}`,
        photoURL: tgUser.photo_url || existingData.photoURL || ''
      };
    }

    // Initialize brand new Telegram user with 0 balance, max energy, isolated document
    const newUserData = buildDefaultUserGameData(userId, {
      telegramId: String(tgUser.id),
      username: tgUser.username || '',
      firstName: tgUser.first_name,
      displayName: `${tgUser.first_name}${tgUser.last_name ? ' ' + tgUser.last_name : ''}`,
      photoURL: tgUser.photo_url || ''
    });

    await setDoc(userRef, newUserData);
    return newUserData;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${userId}`);
    throw error;
  }
}

/**
 * Helper to load or initialize isolated user document for Google Auth users
 */
export async function loadOrCreateUserGameData(user: User): Promise<CloudUserGameData> {
  const userRef = doc(db, 'users', user.uid);
  try {
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data() as CloudUserGameData;
      return data;
    }

    // Brand new player document: starts at 0 balance, isolated from other players
    const initialData = buildDefaultUserGameData(user.uid, {
      email: user.email || '',
      displayName: user.displayName || 'Setri Miner',
      photoURL: user.photoURL || ''
    });

    await setDoc(userRef, initialData);
    return initialData;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `users/${user.uid}`);
    throw error;
  }
}

/**
 * Optimized Cloud Sync with merge support
 */
export async function saveUserGameDataToCloud(
  userId: string,
  data: Partial<CloudUserGameData>
): Promise<void> {
  const userRef = doc(db, 'users', userId);
  try {
    await setDoc(userRef, {
      ...data,
      userId,
      updatedAt: Date.now()
    }, { merge: true });
  } catch (err) {
    console.error('Error syncing SetriCoin progress to cloud:', err);
    handleFirestoreError(err, OperationType.WRITE, `users/${userId}`);
  }
}
