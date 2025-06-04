import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
// import { useAuthCheck } from '../../hooks/useAuthCheck'

const SCREEN_WIDTH = Dimensions.get("window").width;

const menuItems = [
  { key: "pets", label: "Pets", path: "/petCrud" },
  { key: "services", label: "Serviços", path: "/services" },
  { key: "scheduling", label: "Agendamentos", path: "/scheduling" },
  { key: "pessoas", label: "Pessoas", path: "/pessoas" },
  { key: "users", label: "Usuários", path: "/users" },
];

export default function DashboardScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-SCREEN_WIDTH))[0];

  // useAuthCheck()

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuOpen ? -SCREEN_WIDTH : 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setMenuOpen(!menuOpen));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        Alert.alert("Erro", "Erro ao fazer logout.");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Erro ao se desconectar. Tente novamente.");
    }
  };

  const handleNavigate = (item: (typeof menuItems)[0]) => {
    setActiveItem(item.key);
    toggleMenu();
    router.push(`/dashboardScreen${item.path}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Ionicons name="home" size={28} color="white" />{" "}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PetSystem</Text>
        <View style={styles.userBox}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
            }}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>{children}</ScrollView>

      <Animated.View
        style={[styles.sideMenu, { transform: [{ translateX: slideAnim }] }]}
      >
        <View style={styles.menuInner}>
          <View style={styles.menuHeader}></View>

          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => handleNavigate(item)}
              style={[
                styles.menuItem,
                activeItem === item.key && styles.activeItem,
              ]}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.separator} />

          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 64,
    backgroundColor: "#0050b3",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  logout: {
    color: "#fff",
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sideMenu: {
    position: "absolute",
    top: 64,
    left: 0,
    width: SCREEN_WIDTH * 0.4,
    height: "100%",
    backgroundColor: "#003a75",
    zIndex: 10,
  },
  menuInner: {
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    color: "white",
    fontSize: 16,
  },
  activeItem: {
    backgroundColor: "#004f9e",
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  separator: {
    height: 1,
    backgroundColor: "#226",
    marginVertical: 16,
  },
});
