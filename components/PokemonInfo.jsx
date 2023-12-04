import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableWithoutFeedback, Keyboard, Text, StyleSheet, ScrollView } from 'react-native';

const PokemonInfo = () => {
  // State to manage the input value for the Pokémon name
  const [pokemonName, setPokemonName] = useState('');
  
  // State to store Pokémon data including name, image, types, and moves
  const [pokemonData, setPokemonData] = useState({
    name: '',
    image: '',
    types: [],
    moves: [],
  });

  // Function to capitalize the first letter of a string
  const capitalize = (st) => {
    return st.charAt(0).toUpperCase() + st.slice(1);
  }

  // Asynchronous function to fetch Pokémon data from the PokeAPI
  const fetchPokemon = async () => {
    try {
      // Trim any white spaces from the user input and convert to lowercase
      const cleanedName = pokemonName.trim().toLowerCase();
      const poke_url = `https://pokeapi.co/api/v2/pokemon/${cleanedName}`

      // Fetch data from the Pokemon API
      const response = await fetch(poke_url)
      const data = await response.json()
  
      // Update state with the fetched data
      setPokemonData({
        name: capitalize(data.name),
        image: data.sprites.front_default,
        types: data.types.map((type) => type.type.name),
        moves: data.moves.slice(0, 10).map((move) => move.move.name),
      });
      
      // Dismiss the keyboard after fetching data
      Keyboard.dismiss();
    } catch (error) {
      // Log an error message if there's an issue fetching Pokémon data
      console.error('Error fetching Pokémon data:', error.message);
    }
  };
  
  // Render the UI
  return (
    <TouchableWithoutFeedback onPress={Keyboard.addListener} accessible={false}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Input field for entering Pokémon name */}
        <TextInput
          style={styles.input}
          placeholder="Enter Pokémon name"
          value={pokemonName}
          onChangeText={(text) => setPokemonName(text)}
        />
        
        {/* Button to trigger the fetchPokemon function */}
        <Button title="Search" onPress={fetchPokemon} style={styles.myButton} />

        {/* Display Pokémon information if available */}
        {pokemonData.name && (
          <ScrollView style={styles.card}>
            {/* Header container with Pokémon name */}
            <View style={styles.headerContainer}>
              <Text style={styles.header}>{pokemonData.name}</Text>
            </View>
            
            {/* Image of the Pokémon */}
            <Image source={{ uri: pokemonData.image }} style={styles.image} />
            
            {/* Display Pokémon types */}
            <View>
              <Text style={styles.h2}>Type(s):</Text>
              {pokemonData.types.map((type, index) => (
                <Text key={index} style={styles.p}>{index + 1} : {type}</Text>
              ))}
            </View>

            {/* Display Pokémon moves */}
            <View>
              <Text style={styles.h2}>Moves:</Text>
              {pokemonData.moves.slice(0, 10).map((move, index) => (
                <Text key={index} style={styles.p}>{index + 1} : {move}</Text>
              ))}
            </View>
          </ScrollView>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

// Stylesheet for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    padding: 16,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  }, 
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 64,
    color: 'deepskyblue',
  },
  h2: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 16,
    marginTop: 16,
    color: 'deepskyblue',
    alignContent: 'center'
  },
  p: {
    fontStyle: 'italic',
    color: "cornflowerblue",
    fontSize: 14,
    fontWeight: 100
  },
  myButton: {
    borderColor: 'gray',
    borderWidth: 1,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
    padding: 8,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default PokemonInfo;