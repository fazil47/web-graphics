import React, { useContext, useEffect } from "react";
import "./Page.css";

import { User } from "firebase/auth";
import {
  FirebaseAuthContext,
  FirestoreContext,
  syncPageWithFirebase,
} from "../utils/firebase/FirebaseUtils";

import Quiz, { QuizState } from "./Quiz";

interface PageProps {
  pageName: string;
  children: React.ReactNode;
}

export default function Page({ pageName, children }: PageProps) {
  const [quizCount, setQuizCount] = React.useState(0);
  const [quizStates, setQuizStates] = React.useState<Array<QuizState>>([]);

  const firebaseAuth = useContext(FirebaseAuthContext);
  const firestore = useContext(FirestoreContext);

  useEffect(() => {
    let quizCount = 0;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === Quiz) {
        quizCount++;
      }
    });
    setQuizCount(quizCount);
    setQuizStates(new Array(quizCount).fill(QuizState.Unanswered));

    const initializeQuizStates = async (currentUser: User) => {
      const storedQuizStates = await syncPageWithFirebase({
        firestore,
        currentUser,
        pageName,
      });
      if (storedQuizStates) {
        setQuizStates(storedQuizStates);
      }
    };
    if (firebaseAuth.currentUser && firestore && quizCount > 0) {
      initializeQuizStates(firebaseAuth.currentUser);
    }
  }, [firebaseAuth.currentUser, firestore, children, pageName]);

  const handleQuizStateUpdate = (
    quizIndex: number,
    quizState: QuizState
  ): void => {
    if (!firebaseAuth.currentUser) {
      return;
    }

    let newQuizStates = [...quizStates];
    newQuizStates[quizIndex] = quizState;
    setQuizStates(newQuizStates);
    syncPageWithFirebase({
      firestore,
      currentUser: firebaseAuth.currentUser,
      pageName,
      updatedQuizStates: newQuizStates,
    });
  };

  const getchildrenWithProps = (): Array<JSX.Element> => {
    let quizCount = 0;
    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Quiz) {
        const quizIndex = quizCount;
        quizCount++;
        return React.cloneElement(child, {
          handleQuizStateUpdate: (quizState: QuizState) => {
            handleQuizStateUpdate(quizIndex, quizState);
          },
          initialQuizState: quizStates[quizIndex],
        });
      }
      return child;
    });

    // TODO: Use a better error component
    if (!childrenWithProps) {
      return [<div>Error adding properties to this page's childrent</div>];
    }

    return childrenWithProps as Array<JSX.Element>;
  };

  const getProgressPercentage = (): number => {
    const progress =
      (100 *
        quizStates.reduce(
          (accumulatedValue: number, quizState: QuizState) =>
            (quizState === QuizState.Correct ? 1 : 0) + accumulatedValue,
          0
        )) /
      quizCount;
    return progress;
  };

  return (
    <div id="page">
      {quizStates.length > 0 && <h3>Progress: {getProgressPercentage()}%</h3>}
      {getchildrenWithProps()}
    </div>
  );
}
