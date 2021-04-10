import React, { Component } from 'react'
import styles from './Details.module.css';
import { Jumbotron } from 'react-bootstrap';
import { MDBContainer } from 'mdbreact';
import charminar from './Charminar.PNG';
import mild from './mild.png';
import cold from './cold.png';
import sunny from './sunny.png';
import axios from 'axios';
const url = 'http://api.openweathermap.org/data/2.5/weather?id=1269843&appid=dcf4aeb12f5b93915cdec0ca84080065'; 
export class Details extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            activeTab:'1',
            celsius:'1',
            data:0,
            far:0,
        }
    }
    
    componentDidMount() {
        axios({
            method: "get",
            url: url,
            headers: { "Content-Type": 'application/json'}
        })
       .then(response => this.setState 
        ({data : response.data.main.temp}))
       .catch(e => {
         console.log('Hang on ,Data is loading...',e)
       })
       if(this.state.data)this.setState({
           far : (this.state.data*9/5)+32
       })
      }

    toggle = (tab) => {
        
        this.setState({
            activeTab:tab
        });
        }

        toggleTemp = (tab) => {
            
            this.setState({
                celsius:tab
            });
            }

    render() {
        const { activeTab , data , celsius} = this.state;
        const farn = ((data-273)*1.8)+32;
        var temp="";
        if(data-273<10) temp="cold";
        else if (data-273>10 && data-273<20) temp="mild";
        else temp="sunny"

        return (
            <>
                <div className = {styles.mainContainer}>

                <button className = {styles.button} onClick={()=>this.toggle(1)}>About Me</button>
                <button className = {styles.button} onClick={()=>this.toggle(0)}>My Town</button>
                    {
                        activeTab?(
                            <div>
                                <MDBContainer>
                                    <Jumbotron className={styles.jumbotron} >
                                        <ul className = {styles.list}>
                            <li> I’m Hem, a student of <abbr title= "Master of Computer Applications">MCDA</abbr> program at Saint Mary’s university, Halifax.</li>
                             <li> I come from Hyderabad, India </li>
                            <li>I chose <abbr title= "Master of Computer Applications">MCDA</abbr> program as it fits best for me. It has all the flexibilities which can help me in building my career.</li>
                        </ul></Jumbotron>
                        </MDBContainer>
                            </div>
                        ):(
                            <div>
                                <MDBContainer>
                                <Jumbotron className={styles.jumbotron} >
                                <ul className = {styles.list}>
                                  <li>  <img 
                                     className={styles.image}
                                     src = {charminar} 
                                     alt = "Charminar"
                                     ></img>
                                     </li>
                                
                                <li>I come from Hyderabad, India
                                It’s know for Biriyani and other delicious food and it is the capital for Telangana State in India.
                                </li>
                                <li> 
                                    <img src = {sunny}
                                    alt="temperature"></img>                             
                                    { celsius?(
                                        <>
                                    {data-273}</>):(
                                        <>
                                    {farn}</>)}
                                </li>
                                <li>
                                <button className = {styles.button} onClick={()=>this.toggleTemp(1)}>C°</button>
                                <button className = {styles.button} onClick={()=>this.toggleTemp(0)}>F°</button>
                                </li>
                                </ul></Jumbotron>
                    </MDBContainer>
                            </div>
                        )
                    }
                </div>
            </>
        )
    }
}

export default Details
