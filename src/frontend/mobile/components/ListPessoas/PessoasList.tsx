import { ChevronRight } from "@tamagui/lucide-icons";
import { TextInput } from "react-native";
import { ListItem, Separator, YGroup } from "tamagui";
import React from "react";
import { useRouter } from "expo-router";

export function PessoasList() {
  const router = useRouter();
  const [data, setData] = React.useState<any[]>([]);
  React.useEffect(() => {
    fetch("http://petshop.goul.me/api/pessoas", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  function openDetails(pessoa: any) {
    router.push(`/dashboardScreen/pessoaDetails/${pessoa.id}`);
  }

  const [query, setQuery] = React.useState("");

  const filteredPessoas = data.filter((u) =>
    u.nome.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <TextInput
        placeholder="Buscar pessoa..."
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
        {filteredPessoas.map((pessoa) => (
          <YGroup.Item key={pessoa.id}>
            <ListItem
              size={"$6"}
              width={"100%"}
              hoverTheme
              pressTheme
              title={pessoa.nome}
              iconAfter={ChevronRight}
              onPress={() => openDetails(pessoa)}
            />
          </YGroup.Item>
        ))}
      </YGroup>
    </>
  );
}
