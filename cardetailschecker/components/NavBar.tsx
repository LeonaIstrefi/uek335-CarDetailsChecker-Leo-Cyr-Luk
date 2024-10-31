import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
 
const HomepageRoute = () => <Text> </Text>;
 
const OverviewRoute = () => <Text> </Text>;
 
const ProfileRoute = () => <Text> </Text>;
 
 
const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'homepage', title: 'Homepage', focusedIcon: 'home'},
    { key: 'overview', title: 'Overview', focusedIcon: 'car' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account-outline' },
  ]);
 
  const renderScene = BottomNavigation.SceneMap({
    homepage: HomepageRoute,
    overview: OverviewRoute,
    profile: ProfileRoute,
  });
 
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
 
export default MyComponent;