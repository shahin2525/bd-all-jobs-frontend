export interface IUser {
  userId: string;
  name: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  //   hasShop?: boolean;
  isActive?: boolean;
  role: "admin" | "recruiter" | "candidate";
  iat?: number;
  exp?: number;
}
