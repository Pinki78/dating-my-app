import { ScrollView, StyleSheet, Text, View } from 'react-native'
import NewUesrsFrom from './new-uesrs-from'
import ContinueWith from '../../components/continue-with/continue-with'
const NewUesrsModul = () => {
    return (
        <>
          
                <NewUesrsFrom />
                <ContinueWith
                    textUsesrNameLink="Log In" headerText="Or Continue With"
                    handlePressurl="log-in"
                    usesrUp2={{ marginTop: 20 }}
                />
            
        </>
    )
}

export default NewUesrsModul

const styles = StyleSheet.create({})