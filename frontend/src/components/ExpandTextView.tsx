import React, { Component } from 'react';
import { IonText } from '@ionic/react';
import "./ExpandTextView.css";

interface ExpandTextViewProps {
   text: string,
   limit: number
}

class ExpandTextView extends Component<ExpandTextViewProps> {
   state = { showAll: false }
   showMore = () => this.setState({ showAll: true });
   showLess = () => this.setState({ showAll: false });

   render() {

      const limited = this.props.text.substring(0, this.props.limit) + "...";

      return (
         <div>
            <IonText>
               {this.props.text.length <= this.props.limit &&
                  this.props.text.split("\n").map((item, i) => {
                     return <p key={i}>{item}</p>
                  })
               }

               {this.state.showAll && <>
                  {this.props.text.split("\n").map((item, i) => {
                     return <p key={i}>{item}</p>
                  })}
                  <span className="clickable"><a onClick={this.showLess}>Read less</a></span>
               </>}

               {!this.state.showAll && this.props.text.length > this.props.limit && <>
                  {limited.split("\n").map((item, i) => {
                     return <p key={i}>{item}</p>
                  })}
                  <span className="clickable"><a onClick={this.showMore}>Read more</a></span>
               </>}
            </IonText>
         </div>
      )
   }
}

export default ExpandTextView;