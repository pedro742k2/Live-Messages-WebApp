import { useContext, lazy, Suspense } from "react";
import styles from "./App.module.scss";
import { LoadingPage } from "./components/LoadingPage/LoadingPage";
import { MessageList } from "./components/MessageList";
import { AuthContext } from "./contexts/auth";

const SendMessageForm = lazy(() => import("./components/SendMessageForm"));
const LoginBox = lazy(() => import("./components/LoginBox"));

const loadSidePage = (user: any) => {
  if (user) {
    return (
      <Suspense fallback={<LoadingPage />}>
        <SendMessageForm />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <LoginBox />
    </Suspense>
  );
};

export const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <main
      className={`${styles.contentWrapper} ${user ? styles.contentSigned : ""}`}
    >
      <MessageList />
      {loadSidePage(user)}
    </main>
  );
};
