import { createContext } from 'react';

type UserDetail = {
  access: string;
  username: string;
};

type UserContextType = {
  userDetails: UserDetail;
  setUserDetails: Function;
};

const UserContext = createContext<UserContextType>({
  userDetails: { access: '', username: '' },
  setUserDetails: () => {},
});

export default UserContext;
