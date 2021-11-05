export type AuthStackParamList = {
  Auth: undefined;
  Login: undefined;
  Confirm: { email: string };
  SignUp: { email?: string };
};
