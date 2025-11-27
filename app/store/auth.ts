export interface AuthState {
  token: string | null;
  user: { [key: string]: any } | null;
  whatsappToken: string | null;
  permissions: string[];
}

export const useAuthStore = () => {
  const { $api, $http } = useNuxtApp();

  // Cookies
  const tokenCookie = useCookie("token");
  const cookieWhatsappToken = useCookie("whatsapp_token");
  const cookieUser = useCookie("user");

  // State
  const state = useState<AuthState>("auth", () => ({
    token: tokenCookie.value ?? null,
    user: (cookieUser.value as any) ?? null,
    permissions: [],
    whatsappToken: cookieWhatsappToken.value ?? null,
  }));

  // Computed
  const isAuth = computed(() => !!state.value.token);
  const userPermissions = computed(() => state.value.permissions);

  const getUser = async () => {
    const user = await $api<{ data: any }>("auth/user");
    state.value.user = user.data;
  };

  return {
    state,
    isAuth,
    userPermissions,
    getUser,
  };
};
