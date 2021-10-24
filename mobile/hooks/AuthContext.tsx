import React, {
  Dispatch,
  FC,
  useContext,
  useReducer,
} from "react";
import jwtDecode from "jwt-decode";
import API from "../requests/api";

export interface JWTToken {
  family_name: string;
  given_name: string;
  nickname: string;
  picture: string;
  sub: string;
}

export interface Player {
  firstName: string;
  lastName: string;
  picture: string;
  externalId: string;
  playerId: string;
}

interface LoginAction {
  type: "login";
  player: Player;
}

type Action = LoginAction;

interface State {
  player?: Player;
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
        return {
          ...state,
          player: action.player,
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
