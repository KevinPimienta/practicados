import React, {useContext} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {DigimonContext} from '../Context/DigimonContext';
import Constants from 'expo-constants';
import firebase from '../Settings/ConfigFirebase'

const validations =Yup.object().shape({
    identificador:Yup.number().typeError('Este campo es numérico').max(99999999,"Número muy grande").required('Obligatorio'),
    nombre:Yup.string().min(2,'Nombre muy corto').max(50,'Nombre muy largo').required('Obligatorio'),
    companero: Yup.string().email('Correo inválido').required('Obligatorio'),
    temporada: Yup.string().nullable().required('Selecciona una temporada')
})


export default function Formulario({route,navigation}){
    const {status} = route.params;
    const {digimon,lista,setDigimon,setLista}= useContext(DigimonContext);

    return(
        <View style={styles.container}>
            <Text style={styles.header}>Digimon</Text>

            <Formik
                initialValues={digimon}
                onSubmit={(values,{resetForm})=>{
                     firebase.database().ref('Digimon/'+digimon.identificador).update(digimon).then(()=>{
                         alert("Enviado")
                     })
                    const temporal = lista.filter(al=>al.identificador!=digimon.identificador);//!==
                    //alert('enviado')
                    setLista([...temporal,digimon]);
                    resetForm({
                        identificador:"",
                        nombre:"",
                        companero:"",
                        temporada:""
                    })
                    navigation.goBack();

                    console.log(lista) 
                }}
                validationSchema={validations}
                validate={(values)=>{
                    setDigimon(values)
                    console.log(digimon)
                }}
            >
            {
                ({handleChange, handleBlur, handleSubmit, setFieldValue, handleReset, errors, values})=>(
                    <View>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('identificador')}
                            onBlur={handleBlur('identificador')}
                            placeholder="Identificador"
                            value={values.identificador}
                            editable={status==="add"?true:false}
                        />
                        
                        {errors.identificador && <Text style={styles.texterror}>{errors.identificador}</Text>}

                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                            placeholder="Nombre"
                            value={values.nombre}                        

                        />

                        {errors.nombre && <Text style={styles.texterror}>{errors.nombre}</Text>}

                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('companero')}
                            onBlur={handleBlur('companero')}
                            placeholder="Compañero"
                            value={values.companero}                        

                        />      

                        {errors.companero && <Text style={styles.texterror}>{errors.companero}</Text>}       

                        <View style={styles.picker}>
                            <Picker
                                mode="dialog"
                                style={{height:40, backgroundColor:'white'}}
                                selectedValue={values.temporada}
                                onValueChange={ (v)=>
                                    setFieldValue('temporada',v)
                                }
                            >
                                <Picker.Item color="grey" label="Temporada" value="" />
                                <Picker.Item color="black" label="Adventure" value="Adventure"/>
                                <Picker.Item color="black" label="02" value="02"/>
                                <Picker.Item color="black" label="Tamers" value="Tamers"/>
                            </Picker>
                        </View>

                        {errors.temporada && <Text style={styles.texterror}>{errors.temporada}</Text>}

                        <View style={{marginTop:20}}>
                            <Button
                                buttonStyle={styles.buttons}
                                onPress={handleSubmit}
                                title="Enviar"
                            />

                            {
                                status==="add"
                                &&
                                <Button
                                buttonStyle={styles.buttons}
                                onPress={handleReset}
                                title="Limpiar"
                                />

                            }
                        


                        </View>

                    </View>
                )


            }    
                
            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      margin:20,
      marginTop:Constants.statusBarHeight
   
    },
    texterror:{
      color:'red'
    },
    textinput:{
      borderRadius:10, 
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
      margin:5, 
      paddingLeft:15, 
      backgroundColor:'white',
      elevation: 5,
    },
    buttons:{
      backgroundColor:'gray', 
      color:'black', 
      marginTop:10, 
      borderRadius:10
    },
    header:{
      fontSize:20, 
      textAlign:'center', 
      marginBottom:40
    },
    picker:{
      margin:5, 
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: 'gray', 
      overflow: 'hidden',
      elevation: 5,
    }
  
  });
  