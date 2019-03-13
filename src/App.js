import React, { Component } from 'react';
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import images from "./cards.json";
import './App.css';

class App extends Component {

    // Set state
    state = {
      images,
      clickedImages: [],
      score: 0,
      goal: 12,
      status: ""
    };
  
    // Shuffle the cards in the browser when clicked
    shuffleScoreCard = id => {
      let clickedImages = this.state.clickedImages;
  
      if(clickedImages.includes(id)){
        this.setState({ clickedImages: [], score: 0, status:  "Game Over! You lost. Click to play again!" });
        return;
      } else {
        clickedImages.push(id)
  
        if(clickedImages.length === 12){
          this.setState({score: 12, status: "You Won! Well Done! Click to play again.", clickedImages: []});
          console.log('You Win');
          return;
        }
  
        this.setState({ images, clickedImages, score: clickedImages.length, status: " " });
  
        for (let i = images.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [images[i], images[j]] = [images[j], images[i]];
        }
      }
    }

  // Map over this.state.cards and render a Card component for each card object
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky Game</h1>
          <p className="App-intro">
            Look, memorize and don't click the same image twice!
          </p>
        </header>
        <Score total={this.state.score}
               goal={12}
               status={this.state.status}
               />
        <Wrapper>
          {this.state.images.map(image => (
            <Card
              shuffleScoreCard={this.shuffleScoreCard}
              id={image.id}
              key={image.id}
              image={image.image}
            />
          ))}
        </Wrapper>
        <footer>
          <p></p>
        </footer>
    </div>
    );
  }
}  

export default App;
