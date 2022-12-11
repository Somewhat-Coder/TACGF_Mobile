import { StyleSheet, Text } from "react-native";
import { Card , Title} from 'react-native-paper';
const Stats = (props) => {
 return (
    <Card style={style.card}>
    <Card.Content style={style.content}>
      <Title style={{fontSize:30 , fontWeight:"bold", marginBottom:15}}> {props.number} </Title>
      < Text> {props.description} </Text>
    </Card.Content>
  </Card>
 );
}

const style = StyleSheet.create({
    card:{
        height:170,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center'
    }
   
})

export default Stats;