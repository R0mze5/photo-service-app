import { PostId, UserName } from ".";

export type ScreensStackList = {
  Main?: undefined;
  PostDetails: { id?: PostId };
  UserDetails: { username?: UserName };
};
