import { useQuery } from "@apollo/client";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { View, Text, Alert, ScrollView, RefreshControl } from "react-native";
import { Loader } from "../../components/Loader";
import { SearchBar } from "../../components/SearchBar";
import { SquarePhoto } from "../../components/SquarePhoto";
import { StyledMainContainer } from "../../components/StyledMainContainer";
import useInput from "../../hooks/useInput";
import { SEARCH } from "../../queries";
import { PostSearch, UserSearch } from "../../typings";
import { TabStackParamList } from "../../typings/TabStack";

export const SearchScreen: React.FC<
  BottomTabScreenProps<TabStackParamList, "Search">
> = ({ navigation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [fetchValue, setFetchValue] = useState("");

  const { data, refetch, loading } = useQuery<{
    searchPost: Array<PostSearch>;
    searchUser: Array<UserSearch>;
  }>(SEARCH, {
    variables: { term: fetchValue },
    skip: fetchValue === "",
    fetchPolicy: "network-only",
  });

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      Alert.alert((error as { message: string })?.message);
    } finally {
      setIsRefreshing(false);
      setFetchValue("");
    }
  };

  const onSearch = async (value: string) => {
    setFetchValue(value);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar initialValue="" onSubmit={onSearch}></SearchBar>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
      // on={() => console.log(30)}
    >
      {loading ? (
        <Loader></Loader>
      ) : (
        data?.searchPost?.map((file) => (
          <SquarePhoto key={file.id} {...file}></SquarePhoto>
        ))
      )}
    </ScrollView>
  );
};
