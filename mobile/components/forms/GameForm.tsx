import { Picker } from "@react-native-picker/picker";
import React, { FC, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { FormInput } from "../../constants/FormInputs";
import Checkbox from "expo-checkbox";
import { Player } from "../../hooks/AuthContext";
import { Paragraph } from "../../constants/Text";

interface FormData {
  winningPlayerId: string;
  participatingPlayerIds: string[];
}

interface Props {
  onSubmit: (data: FormData) => void | Promise<void>;
  players: Player[];
}

export const GameForm: FC<Props> = ({ onSubmit, players }) => {
  //   const { control, handleSubmit, formState } = useForm<FormData>();
  const [winningPlayerId, setWinningPlayerId] = useState<string>();
  const [participatingPlayers, setParticipatingPlayers] = useState<string[]>([]);

  return (
    <View>
      <Picker
        onValueChange={(playerId: string) => setWinningPlayerId(playerId)}
      >
        {players.map((player) => {
          <Picker.Item
            label={`${player.firstName} ${player.lastName}`}
            value={player.playerId}
          />;
        })}
      </Picker>

      {players.map((player) => (
        <View>
          <Checkbox
            onValueChange={(enabled) => {
                if (enabled) {
                    const idx = participatingPlayers.findIndex(id => id === player.playerId);
                    const newPlayers = participatingPlayers.splice(idx, 1)
                    setParticipatingPlayers(newPlayers);
                } else {
                    setParticipatingPlayers([...participatingPlayers, player.playerId])
                }
            }}
            value={participatingPlayers.includes(player.playerId)}
          />
          <Paragraph>
            {player.firstName} {player.lastName}
          </Paragraph>
        </View>
      ))}

      <Button
        onPress={() =>
          onSubmit({
            winningPlayerId: winningPlayerId!,
            participatingPlayerIds: Array.from(participatingPlayers.current),
          })
        }
        title="Publish"
        disabled={!!winningPlayerId}
      />
    </View>
  );
};
