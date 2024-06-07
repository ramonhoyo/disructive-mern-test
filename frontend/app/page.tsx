import styles from "./page.module.css";
import EntriesPage from "@/src/features/entries/entries.page";
import ProtectedRoute from "@/src/features/auth/protected-route";

export default function Home() {
  return (
    <main>
      <ProtectedRoute>
        <EntriesPage />
      </ProtectedRoute>
    </main>
  );
}
