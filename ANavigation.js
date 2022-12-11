import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { View } from 'react-native';
import { List } from 'react-native-paper';
const ANavigation = (props) => {
   const visible = () => {
      props.setvisible();
   }
    return (
        <View style={{padding:20}}>
        <List.Item
        title="Student data"
        left={props => <List.Icon {...props} icon={require('./Images/deletestudent.png')}
        onPress={null}
         />}
      
      />
      <List.Item
        title="Teacher Data"
        left={props => <List.Icon {...props} icon={require('./Images/details.png')}
        onPressIn={()=>{props.teacherdata()}}
         />}
      />
      <List.Item
        title="Change Password"
        left={props => <List.Icon {...props} icon={require('./Images/settings.png')}/>}
      onPress={()=>{props.setvisible()}}
      />
        </View>
     );
}

export default ANavigation;