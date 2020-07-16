import React, { Component } from 'react';

class Loader extends Component {
    
    
    renderMultiple = () => {

        let items = [];
        for (let index = 0; index < this.props.count; index++) {
            
            items.push(index)
        }

        return items.map((item) => {
            return(
                <div className="ui placeholder" key = {item}>
                    <div className="image header">
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
            )
        })

    };
    
    
    
    render() {
        return (
            <div>
                {this.renderMultiple()}
            </div>
        );
    }
}

export default Loader;
