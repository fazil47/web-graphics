import { createContext } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, Auth, User } from "firebase/auth";
import { getFirestore, Firestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { QuizState } from "../../components/Quiz";

// Configure Firebase.
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const isFirebaseConfigValid = () => {
    for (const [, value] of Object.entries(firebaseConfig)) {
        if (!value) { return false; }
    }
    return true;
}

export const initializeFirebaseApp = () => isFirebaseConfigValid() ? initializeApp(firebaseConfig) : null;
export const getFirebaseAuth = (firebaseApp = initializeFirebaseApp()) => firebaseApp ? getAuth(firebaseApp) : null;
export const getFirestoreObject = (firebaseApp = initializeFirebaseApp()) => firebaseApp ? getFirestore(firebaseApp) : null;

export const FirebaseAppContext = createContext<FirebaseApp | null>(initializeFirebaseApp());
export const FirebaseAuthContext = createContext<Auth | null>(getFirebaseAuth());
export const FirestoreContext = createContext<Firestore | null>(getFirestoreObject());

enum FirebaseRequestResponse {
    Success,
    PageNotFound,
    DocumentNotFound,
    Error,
    InvalidData,
}

function syncWithLocalStorage({
    pageName,
    updatedPageQuizStates
}: {
    pageName: string;
    updatedPageQuizStates?: Array<QuizState>;
}): Array<QuizState> | undefined {
    const storedQuizStates = JSON.parse(localStorage.getItem("quizStates") || "{}");
    if (updatedPageQuizStates) {
        const updatedQuizStates = storedQuizStates ? storedQuizStates : {};
        updatedQuizStates[pageName] = updatedPageQuizStates;
        localStorage.setItem("quizStates", JSON.stringify(updatedQuizStates));
    } else {
        return storedQuizStates[pageName] as Array<QuizState> | undefined;
    }
}

export async function syncPageWithFirebase({
    firestore,
    currentUser,
    pageName,
    updatedPageQuizStates,
}: {
    firestore: Firestore | null;
    currentUser: User | null;
    pageName: string;
    updatedPageQuizStates?: Array<QuizState>;
}): Promise<Array<QuizState> | undefined> {
    // Sync with localStorage as well
    const localQuizStates = syncWithLocalStorage({ pageName, updatedPageQuizStates });

    if (!currentUser || !firestore) {
        return localQuizStates;
    }

    const { storedQuizStates, responseType } = await readFromFirebase(
        firestore,
        currentUser,
        pageName
    );

    if (responseType === FirebaseRequestResponse.Error) {
        return;
    } else if (responseType === FirebaseRequestResponse.InvalidData) {
        return;
    }

    if (updatedPageQuizStates) {
        if (responseType === FirebaseRequestResponse.DocumentNotFound) {
            await addToFirebase(
                updatedPageQuizStates,
                firestore,
                currentUser,
                pageName
            );
        } else {
            await updateFirebase(
                updatedPageQuizStates,
                firestore,
                currentUser,
                pageName
            );
        }
    } else if (responseType === FirebaseRequestResponse.Success) {
        return storedQuizStates;
    }
}

async function readFromFirebase(
    firestore: Firestore,
    student: User,
    pageName: string
): Promise<{
    storedQuizStates?: Array<QuizState>;
    responseType: FirebaseRequestResponse;
}> {
    if (!student) {
        return { responseType: FirebaseRequestResponse.InvalidData };
    }

    try {
        const docSnapshot = await getDoc(
            doc(firestore, "students", student.uid)
        );
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data && data[pageName]) {
                return {
                    storedQuizStates: data[pageName].quizStates,
                    responseType: FirebaseRequestResponse.Success,
                };
            } else {
                return { responseType: FirebaseRequestResponse.PageNotFound };
            }
        } else {
            return { responseType: FirebaseRequestResponse.DocumentNotFound };
        }
    } catch (e) {
        console.error("Error reading document: ", e);
        return { responseType: FirebaseRequestResponse.Error };
    }
}

async function addToFirebase(
    quizStates: Array<QuizState>,
    firestore: Firestore,
    user: User,
    pageName: string
): Promise<FirebaseRequestResponse> {
    if (quizStates.length === 0) {
        return FirebaseRequestResponse.InvalidData;
    }

    try {
        await setDoc(
            doc(firestore, "students", user.uid),
            {
                [pageName]: { quizStates: quizStates },
            }
        );
    } catch (e) {
        console.error("Error adding document: ", e);
        return FirebaseRequestResponse.Error;
    }

    return FirebaseRequestResponse.Success;
}

async function updateFirebase(
    quizStates: Array<QuizState>,
    firestore: Firestore,
    user: User,
    pageName: string
): Promise<FirebaseRequestResponse> {
    if (quizStates.length === 0) {
        return FirebaseRequestResponse.InvalidData;
    }

    try {
        await updateDoc(
            doc(firestore, "students", user.uid),
            {
                [pageName]: { quizStates: quizStates },
            }
        );
    } catch (e) {
        console.error("Error updating document: ", e);
        return FirebaseRequestResponse.Error;
    }

    return FirebaseRequestResponse.Success;
}