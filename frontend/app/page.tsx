import ProtectedRoute from "@/src/features/auth/protected-route";
import HomePage from "@/src/features/home/home.page";

export default function Home() {
  return (
    <main>
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    </main>
  );
}
