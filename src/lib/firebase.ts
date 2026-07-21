import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  User 
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();

// Add Workspace scopes for Drive, Gmail, Docs, Forms
const scopes = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/documents",
  "https://www.googleapis.com/auth/forms.body"
];
scopes.forEach(scope => googleAuthProvider.addScope(scope));

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // Even if we don't have a cached Google OAuth access token, we have a valid logged in user
        if (onAuthSuccess) onAuthSuccess(user, "");
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;
    return { user: result.user, accessToken: cachedAccessToken || "" };
  } catch (error: any) {
    console.error("Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const githubSignIn = async (): Promise<{ user: User } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, githubAuthProvider);
    return { user: result.user };
  } catch (error: any) {
    console.error("GitHub sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const emailSignIn = async (email: string, pass: string): Promise<User> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    return result.user;
  } catch (error: any) {
    console.error("Email sign in error:", error);
    throw error;
  }
};

export const emailSignUp = async (email: string, pass: string, displayName: string): Promise<User> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(result.user, { displayName });
    return result.user;
  } catch (error: any) {
    console.error("Email sign up error:", error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

