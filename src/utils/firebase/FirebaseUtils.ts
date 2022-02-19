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
    const { storedQuizStates, responseType } = await readFromFirebase(
        firestore,
        currentUser,
        pageName
    );

    if (responseType === FirebaseRequestResponse.Error) {
        console.log("Error reading from firebase");
        return;
    } else if (responseType === FirebaseRequestResponse.InvalidData) {
        console.log("Invalid data used to read from firebase");
        return;
    }

    if (updatedQuizStates) {
        if (responseType === FirebaseRequestResponse.DocumentNotFound) {
            await addToFirebase(
                updatedQuizStates,
                firestore as Firestore,
                currentUser as User,
                pageName
            );
        } else {
            await updateFirebase(
                updatedQuizStates,
                firestore as Firestore,
                currentUser as User,
                pageName
            );
        }
    } else if (responseType === FirebaseRequestResponse.Success) {
        console.log("Setting quizStates to storedQuizStates");
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
    console.log("Reading from firebase");
    if (!student) {
        return { responseType: FirebaseRequestResponse.InvalidData };
    }

    try {
        const docSnapshot = await getDoc(
            doc(firestore as Firestore, "students", student.uid as string)
        );
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            console.log(data);
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
    student: User,
    pageName: string
): Promise<FirebaseRequestResponse> {
    console.log("Adding to firebase");
    if (quizStates.length === 0) {
        return FirebaseRequestResponse.InvalidData;
    }

    try {
        await setDoc(
            doc(firestore as Firestore, "students", student?.uid as string),
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
    student: User,
    pageName: string
): Promise<FirebaseRequestResponse> {
    console.log("Updating firebase");
    if (quizStates.length === 0) {
        return FirebaseRequestResponse.InvalidData;
    }

    try {
        await updateDoc(
            doc(firestore as Firestore, "students", student?.uid as string),
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