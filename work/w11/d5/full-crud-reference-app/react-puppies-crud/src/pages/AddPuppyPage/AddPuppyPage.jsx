import React, {Component} from 'react';

class AddPuppyPage extends Component {
  state = {
    invalidForm: true,
    formData: {
      name: '',
      breed: 'Mixed',
      age: '0'
    }
  };

  formRef = React.createRef();

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddPuppy(this.state.formData);
  };

  handleChange = e => {
    const formData = {...this.state.formData, [e.target.name]: e.target.value};
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity()
    });
  };

  render() {
    return (
      <>
        <h1>Add Puppy</h1>
        <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Pup's Name (required)</label>
            <input
              className="form-control"
              name="name"
              value={this.state.formData.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pup's Breed (required)</label>
            <input
              className="form-control"
              name="breed"
              value={this.state.formData.breed}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pup's Age</label>
            <input
              className="form-control"
              name="age"
              value={this.state.formData.age}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn"
            disabled={this.state.invalidForm}
          >
            ADD PUPPY
          </button>
        </form>
      </>
    );
  }
}

export default AddPuppyPage;