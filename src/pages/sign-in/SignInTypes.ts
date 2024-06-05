export interface SignInTypesTypes {
  email: string;
  password: string;
}

export interface Hobby {
  _id: string;
  name: string;
  active: boolean;
  __v: number;
}

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  hobby_ids: Hobby[];
  __v: number;
}
