// Components/Search.js
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import FilmItem from './FilmItem'
import React from 'react'
import { StyleSheet,ActivityIndicator, View, TextInput, Button, Text, FlatList } from 'react-native'



class Search extends React.Component {
   constructor(props) {
    super(props)
    this.searchedText = "" // Initialisation de notre donnée searchedText en dehors du state
    this.state = {
      films: []
      ,isLoading: false
    }
  }
      _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
        )
      }
    }

  _searchTextInputChanged(text) {
          this.searchedText = text
    }
_loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true }) // Lancement du chargement
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
          this.setState({ 
            films: data.results,
            isLoading: false // Arrêt du chargement
          })
      })
    }
}
  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadFilms()}
        />
        <Button title='Rechercher' onPress={() => this._loadFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
        {this._displayLoading()}
      </View>
    )
}
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
   
 
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search