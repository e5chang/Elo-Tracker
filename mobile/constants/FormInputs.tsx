import styled from '@emotion/native';
import { Colors } from './Colors';
import { FontNames } from './Fonts';

export const FormInput = styled.TextInput({
    fontFamily: FontNames.InterMedium,
    fontSize: 14,
    borderBottomColor: Colors.accentGreen,
    borderBottomWidth: 1,
    height: 50,
});