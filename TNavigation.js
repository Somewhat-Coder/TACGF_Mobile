import { View } from 'react-native';
import { List } from 'react-native-paper';
const TNavigation = () => {
 return (
    <View style={{padding:20}}>
      
  <List.Item
    title="Student Details"
    left={props => <List.Icon {...props} icon={require('./Images/details.png')}
    onPress={null}
     />}
  />
  <List.Item
    title="Change Password"
    left={props => <List.Icon {...props} icon={require('./Images/settings.png')}
    onPress={null}
     />}
  />
    </View>
 );
}

export default TNavigation;