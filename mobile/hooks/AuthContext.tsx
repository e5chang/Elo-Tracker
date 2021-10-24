import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useReducer,
} from "react";
import jwtDecode from "jwt-decode";

interface User {
  family_name: string;
  given_name: string;
  nickname: string;
  picture: string;
}

interface LoginAction {
  type: "login";
  idToken: string;
}
type Action = LoginAction;

interface State {
  user?: User;
}

export const UserContext = React.createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: {},
  dispatch: (action: Action): void => undefined,
});

export const UserProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case "login":
        const user = jwtDecode(action.idToken) as User;
        return {
          ...state,
          user,
        };

      default:
        return state;
    }
  }, {});

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export function useAuthState() {
  const { state } = useContext(UserContext);
  return state;
}

export function useAuthDispatch() {
  const { dispatch } = useContext(UserContext);
  return dispatch;
}
