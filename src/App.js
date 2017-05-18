import React, { Component } from 'react';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import './App.css';

const ImageTransformations = ({width, rgb, selectedShirt, text}) => {
  return (
    <Image prublicId={selectedShirt.main +'.jpg'}>
      <Transformation width={width} crop="scale"/>
      <Transformation effect={'red:' + ((-1 + rgb.r/255)*100).toFixed(0)} />
      <Transformation effect={'blue:' + ((-1 + rgb.b/255)*100).toFixed(0)} />
      <Transformation effect={'green:' + ((-1 + rgb.g/255)*100).toFixed(0)} />
      <Transformation underlay={selectedShirt.underlay} flags="relative" width="1.0" />
      <Transformation overlay={selectedShirt.overlay} flags="relative" width="1.0" />
    </Image>
  );
};

class App extends Component {
  constructor(props){
    super(props);
    const defaultShirt = {id: 1, main: 'shirt_only', underlay: 'model2', overlay: ''};
    this.state = {
      shirts: [
        defaultShirt,
        {id: 2, main: 'laying-shirt', underlay: '', overlay: ''},
        {id: 3, main: 'hanging_t-shirt', underlay: '', overlay: 'hanger'}
      ],
      text: ' ',
      selectedShirt: defaultShirt,
      background: {rgb:{r:255, g:255, b:255}}
    };
  }

  handleColorChange(color){
    this.setState({background: color}, _ => this.forceUpdate());
  };

  selectedShirt(thumb){
    this.setSatate({ selectedShirt: thumb}, _ => this.forceUpdate())
  }

  render() {
    const rgb = this.state.background.rgb;
    return (
      <div className="App">
        <CloudinaryContext cloudName="marialobillo-com">
          <div id="imageDemoContainer">
            <div id="mainImage">
              <ImageTransformations
                width="600"
                rgb={rgb}
                selectedShirt={this.state.selectedShirt}
                text={this.state.text} />
            </div>
            <div id="imageThumb">
              <ul id="thumbs">
                {this.state.shirts.map(thumb => {
                  return (
                    <li className={thumb.main === this.state.selectedShirt.main ? 'active': ''} onClick={this.selectedShirt.bind(this, thumb)} key={thumb.id}>
                    {/*<Image prublicId={thumb.main}>*/}
                      {/*<Transformation width="75" crop="scale" />*/}
                    {/*</Image>*/}
                    <ImageTransformations
                      width="75"
                      rgb={rgb}
                      selectedShirt={thumb}
                      text={' '} />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </CloudinaryContext>
      </div>
    );
  }
}

export default App;
