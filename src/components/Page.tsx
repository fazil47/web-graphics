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

export default function Page({ pageName, children }: PageProps) {
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

    const storedQuizStates = await ReadFromFirebase(
      firestore as Firestore,
      currentUser,
      pageName
    );

    if (!storedQuizStates) {
      return;
    }

    if (updatedQuizStates.length > 0) {
      if (storedQuizStates.length === 0) {
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
    } else {
      SetQuizStates(storedQuizStates);
    }
  }

  function HandlePageProgress(quizIndex: number, quizState: QuizState): void {
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
      quizStates.length;
    return progress;
  }

  useEffect(() => {
    const auth = getAuth();
    SetStudent(auth.currentUser as User);

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
): Promise<Array<QuizState> | undefined> {
  console.log("Reading from firebase");
  if (!student) {
    return undefined;
  }

  try {
    const docSnapshot = await getDoc(
      doc(firestore as Firestore, "students", student.uid as string)
    );
    if (docSnapshot.exists()) {
      return docSnapshot.data()[pageName].quizStates;
    } else {
      return [];
    }
  } catch (e) {
    console.error("Error reading document: ", e);
    return undefined;
  }
}

async function AddToFirebase(
  quizStates: Array<QuizState>,
  firestore: Firestore,
  student: User,
  pageName: string
) {
  console.log("Adding to firebase");
  if (quizStates.length === 0) {
    throw new Error("Cannot add empty quizStates to firebase");
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
  }
}

async function UpdateFirebase(
  quizStates: Array<QuizState>,
  firestore: Firestore,
  student: User,
  pageName: string
) {
  console.log("Updating firebase");
  if (quizStates.length === 0) {
    throw new Error("Cannot update with an empty quizStates array");
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
  }
}
