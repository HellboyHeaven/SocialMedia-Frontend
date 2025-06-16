import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ThemeProvider from "./providers/ThemeProvider";
import FeedPage from "pages/FeedPage";
import PostPage from "pages/PostPage";
import AuthProvider from "./providers/AuthProvider";
import RegisterPage from "pages/RegisterPage";
import ProfilePage from "pages/ProfilePage";

const router = createBrowserRouter([
  { path: "/", element: <FeedPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/post/:id", element: <PostPage /> },
  { path: "/user/:id", element: <ProfilePage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
