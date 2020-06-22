import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Input = styled.input`
  display: block;
  margin: 5px;

`

export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      fullName: '',
      email: '',
      password: '',
      error: '',
      success: ''
    }
  }

  componentWillMount(){
    if(localStorage.getItem('userData') === null){
      localStorage.setItem('userData', '[]')
    }
    const user = JSON.parse(localStorage.getItem('loginData'))
    if(user.isLoggedIn){
      this.props.history.push('/')
    }
  }

  register = () =>{
    let localData = JSON.parse(localStorage.getItem('userData'))
    this.setState({error: '', success: ''})

    try{
      if(localData.length < 1){
        localData = []
      }
    } catch(e){
      localData = []
    }

    const {fullName, email, password} = this.state
    const data = {fullName, email, password}

    if(typeof localData.length === 'number'){
      const user = localData.filter(o=> o.email === email)
      if(user.length < 1) {
        localData.push(data)
        const userData = JSON.stringify(localData)

        localStorage.setItem('userData', userData)
        this.setState({success: 'Register Successfully!'})
      } else {
        this.setState({error: 'User already exists!'})
      }
    }
  }

  render() {
    const {error, success} = this.state
    return (
      <div>
        <div>
          <span>{error!=='' && error}</span>
          <span>{success!=='' && success}</span>
        </div>
        <Input type='text' onChange={e=>this.setState({fullName: e.target.value})} placeholder='Full Name' />  
        <Input type='email' onChange={e=>this.setState({email: e.target.value})} placeholder='Email' />  
        <Input type='password' onChange={e=>this.setState({password: e.target.value})} placeholder='Password' />      
        <Input type='button' onClick={this.register} value='Register' />  
        <div>
          Have an account? <Link to='/login'>Login</Link>
        </div>    
      </div>
    )
  }
}
