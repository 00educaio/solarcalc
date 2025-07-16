import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
    onPressFunction: () => void,
    texto: string
};

export const LoadingButton : React.FC<Props> = ( {onPressFunction, texto} : Props) =>  {
    const [loading, setLoading] = useState(false);
    const handlePress = async () => {
        if (loading) return;
        setLoading(true);
        try {
           await onPressFunction();
        } finally {
            setLoading(false);
        }
    };
 return (
   <Button mode='contained' onPress={handlePress} loading={loading} disabled={loading} style={styles.button}>
    {texto}
   </Button>
  );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 8,
        backgroundColor: "#08364E",
        width: 250,
        borderRadius: 10,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      },
})