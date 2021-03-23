import React from 'react';
import {Table, Button} from 'react-bootstrap'
import AxiosClient from './../apis/AxiosClient';

class Takmicenja extends React.Component {

    constructor(props) {
        super(props);

        this.state = { movies: []}
    }

    componentDidMount() {
        this.getTakmicenja();
    }

    getTakmicenja() {
        // Ovde ce da ide poziv ka serveru da se dobave svi elementi formata
        AxiosClient.get('/takmicenja')
            .then(res => {
                 // handle success
                 console.log(res);
                 this.setState({movies: res.data});
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Error occured please try again!');
            });
    }

    getGenresStringFromList(map) {
        return Object.values(map).join(",");
    }

    // goToEdit(movieId) {
    //     this.props.history.push('/movies/edit/'+ movieId); 
    // }

    deleteFromState(movieId) {
        var movies = this.state.movies;
        movies.forEach((element, index) => {
            if (element.id === movieId) {
                movies.splice(index, 1);
                this.setState({movies: movies});
            }
        });
    }

    delete(takmicenjeId) {
        AxiosClient.delete('/takmicenja/' + takmicenjeId)
        .then(res => {
            // handle success
            console.log(res);
            alert('Takmicenje was deleted successfully!');
            this.deleteFromState(takmicenjeId); // ili refresh page-a window.location.reload();
        })
        .catch(error => {
            // handle error
            console.log(error);
            alert('Error occured please try again!');
         });
    }

    // goToAdd() {
    //     this.props.history.push('/movies/add');  
    // }

    renderTakmicenja() {
        return this.state.movies.map((takmicenje) => {
            return (
               <tr key={takmicenje.id}>
                  <td>{takmicenje.naziv}</td>
                  <td>{takmicenje.mestoOdrzavanja}</td>
                  <td>{takmicenje.datumPocetka}</td>
                  <td>{takmicenje.datumZavrsetka}</td>
                  <td>{takmicenje.tipTakmicenja}</td>
                  <td>{takmicenje.brojUcesnika}</td>
                  <td><Button variant="danger" onClick={() => this.delete(takmicenje.id)}>Delete</Button></td>
               </tr>
            )
         })
    }

    render() {
        return (
            <div>
                <h1>List</h1>
                
                <div>
                    <Button onClick={() => this.goToAdd() }>Add</Button>
                    <br/>
                    
                    <Table style={{marginTop:5}}>
                        <thead>
                            <tr>
                                <th>Naziv</th>
                                <th>Mesto odrzavanja</th>
                                <th>Datum pocetka</th>
                                <th>Datum zavrsetka</th>
                                <th>Tip takmicenja</th>
                                <th>Broj ucesnika</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTakmicenja()}
                        </tbody>                  
                    </Table>
                </div>
            </div>
        );
    }
}

export default Takmicenja;