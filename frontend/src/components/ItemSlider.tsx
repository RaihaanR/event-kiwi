import React, { Component } from 'react';
import { IonSlides, IonSlide } from '@ionic/react';
import "./ItemSlider.css";

interface ItemSliderProps {
  width: number,
}

class ItemSlider extends Component<ItemSliderProps> {

  constructor(props: ItemSliderProps) {
    super(props);
  }

  render() {
    const children = this.props.children
    const slideOpts = {
      grabCursor: true,
      width: this.props.width
    };
    
    return (
      <IonSlides className="fullWidth" pager={false} options={slideOpts}>
        {React.Children.map(children, (child, i) => {
          return (
            <IonSlide>
              {child}
            </IonSlide>
          )
        })}
      </IonSlides>
    );
  }
}

export default ItemSlider;