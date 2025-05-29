import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import { useRouter } from 'expo-router'


const SCREEN_WIDTH = Dimensions.get('window').width

export default function Users() {
  const router = useRouter()

  const handleRedirectToNewUser = () => {
    router.push('/cadastroUsers')
  }

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerBox}>
          <View style={styles.header}>
            <Text style={styles.title}>Usuários</Text>

            <TouchableOpacity style={styles.button} onPress={handleRedirectToNewUser}>
              <Text style={styles.buttonText}>Novo usuário</Text>
            </TouchableOpacity>
          </View>

          {/* <SortableTable /> */}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  innerBox: {
    width: SCREEN_WIDTH * 0.9,
    padding: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0050b3',
  },
  button: {
    backgroundColor: '#0050b3',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
