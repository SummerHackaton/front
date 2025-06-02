import React from "react";
import { View, Text, Button } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { globalStyles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Inicio">;

export default function InicioScreen({ navigation }: Props) {
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.card}>
          <Text style={globalStyles.title}>FestLy</Text>
          <Button
            title="Ir al Login"
            onPress={() => navigation.replace("Login")}
          />
      </View>
    </View>
  );
}
