import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form"
import { Button, TextInput, View } from "react-native";

interface FormData {
    email: string;
    password: string;
}

interface Props {
    onSubmit: (data: FormData) => void | Promise<void>;
}

export const LoginForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  console.log(errors)

  return (
    <View>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            // style={styles.input}
            {...field}
          />
        )}
        name="email"
        defaultValue=""
      />
      {/* {errors.firstName && <Text>This is required.</Text>} */}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextInput
            // style={styles.input}
            {...field}
          />
        )}
        name="password"
        defaultValue=""
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}