const initialState = `# Markdown Previewer
## FreeCodeCamp Project

\`Inline Code\`
\`\`\`
Block code
\`\`\`

**bold**
> Quote

Social Networks:
- [FreeCodeCamp](http://freecodecamp.org/nmcardoso)
- [Github](http://github.com/nmcardoso)

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a href="${href}" target="_BLANK" title="${title}">${text}</a>`
}

const markedOptions = {
  renderer,
  breaks: true
}

console.log(renderer);

const Editor = (props) => {
  return (
    <textarea 
      id="editor"
      type="text"
      onChange={props.onChange}
      value={props.text}
      rows="8" />
  );
}

const Preview = (props) => {
  return (
    <div 
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(props.text, markedOptions)
      }} />
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      text: initialState
    });
  }

  handleChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
      <div id="app">
        <h1 id="title">Markdown Previewer</h1>
        <Editor onChange={this.handleChange} text={this.state.text} />
        <Preview text={this.state.text} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));