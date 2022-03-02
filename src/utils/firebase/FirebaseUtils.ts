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

export const initializeFirebaseApp = () => initializeApp(firebaseConfig);
export const getFirebaseAuth = (firebaseApp = initializeFirebaseApp()) => getAuth(firebaseApp);
export const getFirestoreObject = (firebaseApp = initializeFirebaseApp()) => getFirestore(firebaseApp);

export const FirebaseAppContext = createContext<FirebaseApp>(initializeFirebaseApp());
export const FirebaseAuthContext = createContext<Auth>(getFirebaseAuth());
export const FirestoreContext = createContext<Firestore>(getFirestoreObject());

enum FirebaseRequestResponse {
    Success,
    PageNotFound,
    DocumentNotFound,
    Error,
    InvalidData,
}

export async function syncPageWithFirebase({
    firestore,
    currentUser,
    pageName,
    updatedQuizStates,
}: {
    firestore: Firestore;
    currentUser: User;
    pageName: string;
    updatedQuizStates?: Array<QuizState>;
}): Promise<Array<QuizState> | undefined> {
    if (!currentUser) {
        console.error("User isn't logged in");
        return;
    } else if (!firestore) {
        console.error("Firestore instance isn't valid");
        return;
    }

    const { storedQuizStates, responseType } = await readFromFirebase(
        firestore,
        currentUser,
        pageName
    );

    if (responseType === FirebaseRequestResponse.Error) {
        console.error("Error reading from Firebase");
        return;
    } else if (responseType === FirebaseRequestResponse.InvalidData) {
        console.error("Invalid data used to read from Firebase");
        return;
    }

    if (updatedQuizStates) {
        if (responseType === FirebaseRequestResponse.DocumentNotFound) {
            await addToFirebase(
                updatedQuizStates,
                firestore,
                currentUser,
                pageName
            );
        } else {
            await updateFirebase(
                updatedQuizStates,
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