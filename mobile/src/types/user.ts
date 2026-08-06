export type User = {
  id: number;
  email: string;
};

/** Local mock / seed data only — password is never returned by the API. */
export type MockUser = User & {
  password: string;
};
