import React, { useEffect } from "react";
import "./Page.css";

import { getAuth, User } from "firebase/auth";
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { InitializeFirebaseApp } from "../utils/firebase/FirebaseUtils";

import Quiz, { QuizState } from "./Quiz";

interface PageProps {
  pageName: string;
  children: React.ReactNode;
}

enum FirebaseRequestResponse {
  Success,
  PageNotFound,
  DocumentNotFound,
  Error,
  InvalidData,
}

export default function Page({ pageName, children }: PageProps) {
  const [quizCount, SetQuizCount] = React.useState(0);
  const [quizStates, SetQuizStates] = React.useState<Array<QuizState>>([]);
  const [firestore, SetFirestore] = React.useState<Firestore>();
  const [student, SetStudent] = React.useState<User>();

  async function SyncWithFirebase({
    firestore,
    updatedQuizStates = [],
    currentUser = null,
  }: {
    firestore: Firestore;
    updatedQuizStates?: Array<QuizState>;
    currentUser?: User | null;
  }) {
    if (!currentUser) {
      currentUser = student as User;
    }

    const { data: storedQuizStates, responseType } = await ReadFromFirebase(
      firestore as Firestore,
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

    if (updatedQuizStates.length > 0) {
      if (responseType === FirebaseRequestResponse.DocumentNotFound) {
        await AddToFirebase(
          updatedQuizStates,
          firestore as Firestore,
          currentUser as User,
          pageName
        );
      } else {
        await UpdateFirebase(
          updatedQuizStates,
          firestore as Firestore,
          currentUser as User,
          pageName
        );
      }
    } else if (responseType === FirebaseRequestResponse.Success) {
      console.log("Setting quizStates to storedQuizStates");
      SetQuizStates(storedQuizStates as Array<QuizState>);
    }
  }

  function HandlePageProgress(quizIndex: number, quizState: QuizState): void {
    console.log("HandlePageProgress", quizIndex, quizState, quizStates);
    let newQuizStates = [...quizStates];
    newQuizStates[quizIndex] = quizState;
    SetQuizStates(newQuizStates);
    SyncWithFirebase({
      firestore: firestore as Firestore,
      updatedQuizStates: newQuizStates,
    });
  }

  function AddPropsToChildren(): Array<JSX.Element> {
    let quizCount = 0;
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Quiz) {
        const quizIndex = quizCount;
        quizCount++;
        return React.cloneElement(child, {
          HandleProgress: (quizState: QuizState) => {
            HandlePageProgress(quizIndex, quizState);
          },
          initialQuizState: quizStates[quizIndex],
        } as any);
      }
      return child;
    });
    return childrenWithProps as Array<JSX.Element>;
  }

  function CalculateProgressPercentage(): number {
    const progress =
      (100 *
        quizStates.reduce(
          (accumulatedValue: number, quizState: QuizState) =>
            (quizState === QuizState.Correct ? 1 : 0) + accumulatedValue,
          0
        )) /
      quizCount;
    return progress;
  }

  useEffect(() => {
    const auth = getAuth();
    SetStudent(auth.currentUser as User);

    let quizCount = 0;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Quiz) {
        quizCount++;
      }
    });
    SetQuizCount(quizCount);
    SetQuizStates(new Array(quizCount).fill(QuizState.Unanswered));

    const firestore = getFirestore(InitializeFirebaseApp());
    SetFirestore(firestore);
    SyncWithFirebase({
      firestore: firestore,
      currentUser: auth.currentUser as User,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="page">
      {quizStates.length > 0 && (
        <p>Progress: {CalculateProgressPercentage()}%</p>
      )}
      <div>{AddPropsToChildren()}</div>
    </div>
  );
}

async function ReadFromFirebase(
  firestore: Firestore,
  student: User,
  pageName: string
): Promise<{
  data?: Array<QuizState>;
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
          data: data[pageName].quizStates,
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

async function AddToFirebase(
  quizStates: Array<QuizState>,
  firestore: Firestore,
  student: User,
  pageName: string
): Promise<FirebaseRequestResponse> {
  console.log("Adding to firebase");
  if (quizStates.length === 0) {
    // throw new Error("Cannot add empty quizStates to firebase");
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

async function UpdateFirebase(
  quizStates: Array<QuizState>,
  firestore: Firestore,
  student: User,
  pageName: string
): Promise<FirebaseRequestResponse> {
  console.log("Updating firebase");
  if (quizStates.length === 0) {
    // throw new Error("Cannot update with an empty quizStates array");
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
