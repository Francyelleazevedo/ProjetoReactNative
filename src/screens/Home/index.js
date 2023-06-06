import React, { useState } from 'react';
import { Alert, Image } from 'react-native';
import {
    Container,
    Animation,
    Input,
    Button,
    ButtonText,
    AddressMuseu,
    Text
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function Home() {
    const [bairro, setBairro] = useState('');
    const [museu, setMuseu] = useState(null);

    async function handleBuscar() {
        try {
            const { status, data } = await api.get(`api/3/action/datastore_search?q=${bairro}&resource_id=97ab18da-f940-43b1-b0d4-a9e93e90bed5`);

            if (status != 200 || data.erro) {
                Alert.alert('Buscar', 'Digite um Bairro válido.');
            } else {
                setMuseu(data.result.records);
            }

        } catch (error) {
            Alert.alert('Buscar', 'Digite um Bairro válido');
        }
    };

    async function handleLimpar() {
        setMuseu(null);
        setBairro('');
    }

    return (
        <Container>
            <Animation
                animation='bounceInDown'
                delay={100}
                duration={1500}
            >
                <Image source={logo} />
            </Animation>

            <Animation
                animation='bounceInRight'
                delay={100}
                duration={1500}
            >
                {!museu &&
                    <Input
                        keyboardType="text"
                        maxLength={30}
                        onChangeText={setBairro}
                        onSubmitEditing={handleBuscar}
                        placeholder="Digite o Bairro do Museu que deseja buscar"
                        placeholderTextColor="#2F48D4"
                        value={bairro}
                    />
                }

                <Button
                    activeOpacity={0.8}
                    onPress={museu ? handleLimpar : handleBuscar}>
                    <ButtonText>
                        {museu ? 'Limpar' : 'Buscar'}
                    </ButtonText>
                </Button>
            </Animation>

            {museu &&
                <AddressMuseu>
                
                    <Text>Bairro: {bairro}{'\n'}</Text>
                    <Text>Nome do Museu: {museu[0].nome}{'\n'}</Text>
                    <Text>Endereco: {museu[0].logradouro}{'\n'}</Text>
                    <Text>Descrição: {museu[0].descricao}{'\n'}</Text>
                    <Text>Site: {museu[0].site}</Text>
                </AddressMuseu>
            }
        </Container>
    );
}