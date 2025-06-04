import { ChevronRight } from "@tamagui/lucide-icons";
import { TextInput } from "react-native";
import { ListItem, Separator, YGroup } from "tamagui";
import React from "react";

export function UsersDetailsList() {
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch("http://10.0.2.2:3001/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  function openDetails(user: any) {
    console.log("Detalhes do usuário:", user);
  }

  const [query, setQuery] = React.useState("");

  const filteredUsers = data.filter((u) =>
    u.nome.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <TextInput
        placeholder="Pesquisar usuário..."
        value={query}
        onChangeText={setQuery}
        style={{
          width: '100%',
          padding: 8,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 4,
          marginBottom: 12,
        }}
      />
      <YGroup
        alignSelf="center"
        bordered
        width={'100%'}
        size="$5"
        separator={<Separator />}
      >
        {filteredUsers.map((user) => (
          <YGroup.Item key={user.id}>
            <ListItem
              size={"$6"}
              width={"100%"}
              hoverTheme
              pressTheme
              title={user.nome}
              iconAfter={ChevronRight}
              onPress={() => openDetails(user)}
            />
          </YGroup.Item>
        ))}
      </YGroup>
    </>
  );
}
