import { View, StyleSheet, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';

type StatusIndicatorProps = {
    status: string
}
export default function StatusIndicator ( { status }: StatusIndicatorProps ) {    
  if (status == '') return null; // ou um fallback visual

  let color: string = ""
  switch (status.toLowerCase()){
    case "pendente":
      color = "#AF9613"
      break
    case "concluido":
      color = "#3D7A27"
      break
    case "recusado":
      color = "#A83232"
      break
  }

  return (
    <View style={styles.main}>
      <RadioButton
        value="first"
        status={ 'checked' }
        color={color}
      />
      <Text>{status}</Text>
    </View>
  )
}

  const styles = StyleSheet.create({
    main: {
      flexDirection: "row",
      alignItems: "center"
    }
  })