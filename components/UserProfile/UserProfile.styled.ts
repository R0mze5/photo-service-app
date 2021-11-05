import styled from "styled-components/native";
import { constants } from "../../constants";

export const StyledHeader = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const StyledHeaderColumn = styled.View``;
export const StyledProfileAvatar = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;

export const StyledProfileStats = styled.View`
  flex-direction: row;
`;
export const StyledStat = styled.View`
  align-items: center;
  margin-left: 20px;
`;
export const StyledBoldText = styled.Text`
  font-weight: 600;
`;
export const StyledStatName = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${({ theme }) => theme.textColor};
`;

export const StyledProfileMeta = styled.View`
  margin-top: 10px;
  padding-horizontal: 20px;
`;
export const StyledProfileBio = styled.Text``;

export const StyledButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 30px;
  padding-vertical: 5px;
  border: 1px solid ${({ theme }) => theme.profileDividerColor};
`;
export const StyledButton = styled.View`
  width: ${constants.width / 2}px;
  align-items: center;
  justify-content: center;
`;
