export interface FormData {
  firstName: string;
  lastName: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  gender: string;
  country: string;
  state: string;
  place: string;
  hobbies: string[];
  email: string;
  password: string;
  confirmPassword: string;
}

export type Props={setIsLogin: React.Dispatch<React.SetStateAction<boolean>>}