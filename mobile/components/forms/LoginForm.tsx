import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { FormInput } from "../../constants/FormInputs";
import { ValidateEmail } from "../../constants/RegexPatterns";

interface FormData {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: FormData) => void | Promise<void>;
}

export const LoginForm: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, formState } = useForm<FormData>();

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: ValidateEmail,
        }}
        render={({ field }) => (
          <FormInput
            // style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.black}
            textContentType="username"
            {...field}
          />
        )}
        name="email"
      />
      {/* {errors.firstName && <Text>This is required.</Text>} */}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormInput
            // style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.black}
            secureTextEntry
            textContentType="password"
            {...field}
          />
        )}
        name="password"
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        title="Submit"
        color={formState.isValid ? Colors.accentGreen : "red"}
      />
    </View>
  );
};
