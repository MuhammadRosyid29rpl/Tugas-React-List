import React, { Component } from "react";
import $ from 'jquery';
import Card from '../components/Cardd';
class Event extends Component {
    constructor() {
        super()

        this.state = {
            agenda: [
                {
                    isbn: "12345", judul: "17 Agustusan", tanggal: "17 Agustus 2022",
                    tempat: "Lapangan RT 8", deskripsi: "Acara rutin tahunan untuk memperingati hari kemerdekaan Negara Indonesia"

                },
                {

                    isbn: "12346", judul: "Kerja Bakti", tanggal: "27 Maret 2022",
                    tempat: "lingkup RT 8", deskripsi: "Kerja Bakti rutin warga RT 8"
                },
            ],
            action: "",
            isbn: "",
            judul: "",
            tanggal: "",
            tempat: "",
            deskripsi: "",
            selectedItem: null,
        }
        this.state.filterAgenda = this.state.agenda
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev => this.setState({ keyword: ev.target.value })} onKeyUp={ev => this.searching(ev)} />
                    {this.state.filterAgenda.map((item, index) => (
                        <Card

                            judul={item.judul}
                            tanggal={item.tanggal}
                            tempat={item.tempat}
                            deskripsi={item.deskripsi}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>


                <button className="btn btn-success" onClick={() => this.Add()}>

                    Tambah Data
                </button>
               
                <div className="modal" id="modal_agenda">
                    <div className="modal-dialog">
                        <div className="modal-content">
                           
                            <div className="modal-header">
                                Form agenda
                            </div>
                          
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Judul agenda

                                    <input type="text" className="form-control mb-2"

                                        value={this.state.judul}
                                        onChange={ev => this.setState({
                                            judul:
                                                ev.target.value
                                        })}
                                        required />
                                    Tanggal

                                    <input type="text" className="form-control mb-2"

                                        value={this.state.tanggal}
                                        onChange={ev => this.setState({
                                            tanggal
                                                : ev.target.value
                                        })}
                                        required />
                                    Tempat

                                    <input type="text" className="form-control mb-2"

                                        value={this.state.tempat} onChange={ev => this.setState({ tempat: ev.target.value })} required />
                                    Deskripsi

                                    <input type="text" className="form-control mb-8"

                                        value={this.state.deskripsi} onChange={ev => this.setState({ deskripsi: ev.target.value })} required />

                                    <button className="btn btn-info btn-block" type="submit">

                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    Add = () => {
    
        $("#modal_agenda").show()
        this.setState({
            isbn: Math.random(1, 10000000),

            judul: "",
            tanggal: "",
            tempat: "",
            deskripsi: "",
            action: "insert"
        })
    }
    Edit = (item) => {
      
        $("#modal_agenda").show()
        this.setState({
            isbn: item.isbn,
            judul: item.judul,
            tanggal: item.tanggal,
            tempat: item.tempat,
            deskripsi: item.deskripsi,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
      
        let tempagenda = this.state.agenda
        if (this.state.action === "insert") {
         
            tempagenda.push({
                isbn: this.state.isbn,
                judul: this.state.judul,
                tanggal: this.state.tanggal,
                tempat: this.state.tempat,
                deskripsi: this.state.deskripsi
            })

        } else if (this.state.action === "update") {
        
            let index = tempagenda.indexOf(this.state.selectedItem)
            tempagenda[index].isbn = this.state.isbn
            tempagenda[index].judul = this.state.judul
            tempagenda[index].tanggal = this.state.tanggal
            tempagenda[index].tempat = this.state.tempat
            tempagenda[index].deskripsi = this.state.deskripsi
        }
        this.setState({ agenda: tempagenda })
        
        $("#modal_agenda").hide()
    }
    Drop = (item) => {
     
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
         
            let tempagenda = this.state.agenda
         
            let index = tempagenda.indexOf(item)

            tempagenda.splice(index, 1)
            this.setState({ agenda: tempagenda })
        }
    }
    searching = event => {
        if (event.keyCode === 13) {

            let keyword = this.state.keyword.toLowerCase()
            let tempagenda = this.state.agenda
            let result = tempagenda.filter(item => {
                return item.judul.toLowerCase().includes(keyword) ||
                    item.tanggal.toLowerCase().includes(keyword) ||
                    item.tempat.toLowerCase().includes(keyword)
            })
            this.setState({ filterAgenda: result })
        }
    }

}

export default Event;