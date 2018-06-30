const bank = [{
  keyCode: 81,
  key: 'Q',
  id: 'Chord-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
  keyCode: 87,
  key: 'W',
  id: 'Chord-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
  keyCode: 69,
  key: 'E',
  id: 'Chord-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
  keyCode: 65,
  key: 'A',
  id: 'Shaker',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
  keyCode: 83,
  key: 'S',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
  keyCode: 68,
  key: 'D',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
  keyCode: 90,
  key: 'Z',
  id: 'Punchy-Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
  keyCode: 88,
  key: 'X',
  id: 'Side-Stick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
  keyCode: 67,
  key: 'C',
  id: 'Snare',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

/* Stateless Components */
const Display = (props) => {
  return (
    <div id="display">
      {props.text}
    </div>
  );
}

/* Stateful Components */
class DrumPad extends React.Component {
  constructor(props) {
    super(props);

    this.defaultStyle = {
      backgroundColor: 'rgb(216, 216, 216)'
    }

    this.activeStyle = {
      backgroundColor: 'coral'
    }

    this.padStyles = [
      {
        backgroundColor: 'rgb(216, 216, 216)'
      },
      {
        backgroundColor: 'coral'
      }
    ];

    this.state = {
      padStyleId: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.playAudio = this.playAudio.bind(this);
    this.toggleStyle = this.toggleStyle.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleClick(e) {
    this.toggleStyle();
    setTimeout(this.toggleStyle, 100);
    this.props.displayCallback(this.props.id);
    this.playAudio();
  }

  handleKeydown(e) {
    if (e.keyCode === this.props.keyCode) {
      this.handleClick();
    }
  }

  toggleStyle() {
    this.setState({
      padStyleId: this.state.padStyleId === 0 ? 1 : 0
    });
  }

  playAudio() {
    const $audio = document.getElementById(this.props.keyChar);
    $audio.currentTime = 0;
    $audio.play();
  }

  render() {
    return (
      <div 
        id={this.props.id}
        className="drum-pad"
        onClick={this.handleClick}
        style={this.padStyles[this.state.padStyleId]}>
        <audio 
          id={this.props.keyChar}
          className="clip"
          src={this.props.url} />
        <p>{this.props.keyChar}</p>
      </div>
    );
  }
}

class DrumControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Display text={this.props.displayText} />
      </div>
    );
  }
}

class DrumBoard extends React.Component {
  constructor(props) {
    super(props);

    this.drumPads = bank.map((v, i) => {
      return (
        <DrumPad 
          key={i}
          keyChar={v.key} 
          keyCode={v.keyCode}
          id={v.id}
          url={v.url}
          displayCallback={props.displayCallback} />
      );
    });

    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.drumPads}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayText: 'Drum Machine'
    };

    this.handleDisplayText = this.handleDisplayText.bind(this);
  }

  handleDisplayText(newText) {
    this.setState({
      displayText: newText
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="board">
          <DrumBoard displayCallback={this.handleDisplayText} />
        </div>

        <div id="controls">
          <DrumControls displayText={this.state.displayText} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
