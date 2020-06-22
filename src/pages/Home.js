import React, { Component } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  display: block;
  margin: 5px;

`

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: 0,
      userData: {
        fullName: '',
        email: '',
        password: '',
      },
      editData: {
        fullName: '',
        email: '',
        password: '',
      },
      edit: false
    }
  }
  componentWillMount(){
    const user = JSON.parse(localStorage.getItem('loginData'))
    if(!user.isLoggedIn){
      this.props.history.push('/login')
    }
  }

  logout = () => {
    const user = JSON.parse(localStorage.getItem('loginData'))
    user.isLoggedIn = false
    user.email = ""
    localStorage.setItem('loginData', JSON.stringify(user))
    this.props.history.push('/login')
  }

  // editData = (data, form) => {
  //   const {editData} = this.state
  //   editData[form] = data
  //   this.setState({editData: editData})
  // }

  edit = () =>{
    const {editData, id} = this.state
    const listUser = JSON.parse(localStorage.getItem('userData'))
    listUser[id] = editData
    this.setState({userData: editData})
    localStorage.setItem('userData', JSON.stringify(listUser))
  }

  componentDidMount(){
    const currentUser = JSON.parse(localStorage.getItem('loginData'))
    const listUser = JSON.parse(localStorage.getItem('userData'))
    const userData = JSON.parse(localStorage.getItem('userData')).filter(o => o.email === currentUser.email)
    listUser.forEach((user, index)=>{
      if(currentUser.email === user.email){
        this.setState({id: index})
      }
    })
    this.setState({userData: userData[0], editData: userData[0]})
  }
  render() {
    const {fullName: name} = this.state.userData
    const {fullName: editName, email, password} = this.state.editData
    const {edit} = this.state
    return (
      <div>
        <span>Hello, {name} !</span>
        <Input type='button' onClick={()=> this.setState({edit: !this.state.edit})} value='Edit Profile' />
        {edit && <>
          <Input type="text" onChange={e =>this.setState({editData: {fullName: e.target.value, email, password}})} value={editName} />
          <Input type="email" onChange={e =>this.setState({editData: {fullName: editName, email: e.target.value, password}})} value={email} />
          <Input type="password" onChange={e =>this.setState({editData: {fullName: editName, email, password: e.target.value}})} value={password} />
          <Input type='button' onClick={this.edit} value='Submit' />
        </>}
        <Input type='button' onClick={this.logout} value='Logout' />
      </div>
    )
  }
}
