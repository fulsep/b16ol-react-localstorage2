import React, { Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Input = styled.input`
  display: block;
  margin: 5px;

`

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      error: '',
      success: ''
    }
  }

  componentWillMount(){
    if(localStorage.getItem('loginData') === null){
      localStorage.setItem('loginData', '{"isLoggedIn": false, "email": ""}')
    }
    const user = JSON.parse(localStorage.getItem('loginData'))
    if(user.isLoggedIn){
      this.props.history.push('/')
    }
  }

  login = ()=>{
    let localData = JSON.parse(localStorage.getItem('userData'))
    this.setState({error: '', success: ''})

    try{
      if(localData.length < 1){
        localData = []
      }
    } catch(e){
      localData = []
    }

    if(localData.length > 0){
      const {email, password} = this.state
      const user = localData.filter(o => o.email === email && o.password === password )
      if(user.length > 0){
        const data = JSON.stringify({
          isLoggedIn: true,
          email
        })
        localStorage.setItem('loginData', data)
        this.props.history.push('/')
      } else {
        this.setState({error: 'Wrong Username or Password!'})
      }
    } else {
      this.setState({error: 'Internal Server Error'})
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
        <Input type='email' onChange={e=>this.setState({email: e.target.value})} placeholder='email' />      
        <Input type='password' onChange={e=>this.setState({password: e.target.value})} placeholder='password' />      
        <Input type='button' onClick={this.login} value='Login' />  
        <div>
          Don't have an account? <Link to='/register'>Register</Link>
        </div>    
      </div>
    )
  }
}
