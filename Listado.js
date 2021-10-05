import React, {useContext} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DigimonContext} from '../Context/DigimonContext';



const Listado = ({navigation}) => {

    const {lista, setDigimon,eliminar} = useContext(DigimonContext);
    


    return (
    
    <View style={styles.container}>
        <Header
            centerComponent={{ text: 'Lista de digimon', style: { color: '#fff', fontSize:20 } }}
            rightComponent={{ icon: 'person-add', color: '#fff', onPress:()=>{
                 setDigimon({
                     identificador:null,
                     nombre:"",
                     companero:"",
                     temporada:""
                 })   

                 navigation.navigate('Formulario',{status:"add"})

            }}}
            containerStyle={{backgroundColor:'gray'}}
        />
        <ScrollView>
        {
            lista.length>0
            ?
            lista.map((d,i)=>(
                <ListItem key={i} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{d.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{d.companero}</ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={styles.buttons}>
                        <Ionicons name='ios-trash' size={30} color={'red'} onPress={()=>eliminar(d.identificador)}/>
                        <Ionicons name='md-create' size={30} color={'green'}  onPress={()=>{
                            setDigimon({
                                identificador:d.identificador.toString(),
                                nombre:d.nombre,
                                companero:d.companero,
                                temporada:d.temporada
                            })

                            navigation.navigate('Formulario',{status:"edit"})
                        }}/>

                    </View>
                </ListItem>

            ))
            :
            <Text style={{marginTop:50, textAlign:'center', fontSize:20}}>No hay digimon</Text>


        }


        </ScrollView>


    </View>
    );
}
 
export default Listado;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    buttons:{
        width:'25%', 
        flexDirection:'row', 
        justifyContent:'space-between'
    }
});