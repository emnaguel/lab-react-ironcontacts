
import React, { Component } from 'react'
import './App.css';
import allContacts from './contacts.json'

class App extends Component {
  state = {
    contacts: [],
    icon: "👉"

  };
  showContacts = () => {
    const allContactsCopy = [...allContacts.splice(0, 5)]
    
    this.setState({
      icon: this.state.icon === "👉" ? "👇🏼" : "👉",
      contacts: this.state.icon === "👉" ? allContactsCopy : []
    })
  }

  handleRandomContact = () => {
    let randomContact = allContacts[Math.floor(Math.random() * allContacts.length)];
    const copyContact = [...this.state.contacts]
    copyContact.push(randomContact)
    this.setState({
      contacts: copyContact
    })
  }

  handleSortByName = () => {
    const copyContact = [...this.state.contacts].sort((a, b) => a.name.localeCompare(b.name))
    this.setState({
      contacts: copyContact
    })
  }

  handleDelete = (id) => {
    
    
    const newArray = this.state.contacts.filter((contact) => contact.id !== id)
    this.setState({
      contacts: newArray
    })

  }

  render() {
    return (
      <div className="App">

        <div style={{cursor: "pointer"}}>
          <p onClick={this.showContacts}>{this.state.icon} Check image inside</p>
        </div>
        <div> 
          {this.state.contacts.length > 0 && 
          <div style={{margin:'70px'}}>
            <h1 style={{marginBottom: "20px"}}>IronContacts</h1>
            <button style={{marginRight: "5px"}} type="button" class="btn btn-primary" onClick={this.handleRandomContact}>Add Random Contact</button>
            <button type="button" class="btn btn-success" onClick={this.handleSortByName}>Sort By Name</button>
            <br/>
            <br/>
            <hr/>
            <table style={{width: "100%"}}>
              {/* Key prop is mandatory on parent html element  */}
              <thead style={{fontWeight: "bold"}}>
                <tr>
                  <td>Picture</td>
                  <td>Name</td>
                  <td>Popularity</td>
                </tr>
              </thead>
              {this.state.contacts.map((contact, index) => {
                return (
                    <tbody  key={contact.id}>
                      <tr>
                        <td><img style={{height:"50px"}} src={contact.pictureUrl} alt={contact.name}/></td>
                        <td>{contact.name}</td>
                        <td>{contact.popularity}</td>
                        <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(contact.id)}>Delete</button></td>
                      </tr>
                    </tbody>
                );
              })}
              
            </table>
          </div>
          }
            </div>
      </div>
    );
  }
}

export default App;
