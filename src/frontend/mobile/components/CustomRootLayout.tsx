// RootLayout.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function CustomRootLayout({ children }: RootLayoutProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>{children}</View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 PetSystem. Todos os direitos reservados.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  footer: {
    padding: 10,
    backgroundColor: '#111',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter',
  },
});
