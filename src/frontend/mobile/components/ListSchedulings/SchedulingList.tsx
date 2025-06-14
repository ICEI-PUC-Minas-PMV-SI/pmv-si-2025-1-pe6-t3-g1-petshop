import { ChevronRight } from "@tamagui/lucide-icons";
import { TextInput } from "react-native";
import { ListItem, Separator, YGroup } from "tamagui";
import React from "react";
import { useRouter } from "expo-router";

export function UsersDetailsList() {
  const router = useRouter();
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch("http://10.0.2.2:3001/api/schedule/get", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  function openDetails(scheduling: any) {
    router.push(`/dashboardScreen/schedulingDetail/${scheduling.id}`);
  }

  const [query, setQuery] = React.useState("");

  const filteredUsers = data.filter((u) =>
    u.pessoa.toLowerCase().includes(query.toLowerCase())
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
        {filteredUsers.map((scheduling) => (
          <YGroup.Item key={scheduling.id}>
            <ListItem
              size={"$6"}
              width={"100%"}
              hoverTheme
              pressTheme
              title={"DONO: "+ scheduling.pessoa +"--------------- PET: " +  scheduling.pet + "--------------SERVIÇO: " + scheduling.servico}
              iconAfter={ChevronRight}
              onPress={() => openDetails(scheduling)}
            />
          </YGroup.Item>
        ))}
      </YGroup>
    </>
  );
}
