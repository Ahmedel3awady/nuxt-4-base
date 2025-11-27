// import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  // Only run on client side for SPA mode
  if (import.meta.server) {
    return;
  }
 

  const { isAuth } = useAuthStore();

  // Only check permissions for authenticated users
  if (!isAuth.value) {
    return;
  }

  // Check if route has permission requirement in meta
  const requiredPermission = to.meta.permission as string | undefined;

  if (requiredPermission) {
  }

  // Check if route has multiple permissions requirement
  const requiredPermissions = to.meta.permissions as string[] | undefined;

  if (requiredPermissions && requiredPermissions.length > 0) {
  }
});
