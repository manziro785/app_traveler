export interface LoginUser {
  email: string;
  password: string;
}

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
}

export interface GoogleUser {
  googleId: number;
  email: string;
  name: string;
  picture: string;
}
