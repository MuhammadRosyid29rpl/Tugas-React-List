import React, { Component } from "react";
import $ from 'jquery';
import Card from '../components/Carddd';
class Keranjang extends Component {
    constructor() {
        super()

        this.state = {
            barang: [
                {
                    id: "1", nama: "Panci", harga: 20000,

                    cover: "https://tse1.mm.bing.net/th?id=OIP.0FhiGDRBs9aSxi4Z66melgHaHa&pid=Api&P=0&w=168&h=168"

                },
                {

                    id: "2", nama: "Pisau", harga: 10000,
                    cover: "https://tse2.mm.bing.net/th?id=OIP.hbhpJyD02ICYMA7QdZEGdgHaHa&pid=Api&P=0&w=162&h=162"
                },
                {
                    id: "3", nama: "Meja",  harga: 70000,

                    cover: "https://tse2.mm.bing.net/th?id=OIP.3iiJEmE5dOmYN6_o4ef9vQHaHa&pid=Api&P=0&w=171&h=171"

                },
                {
                    id: "4", nama: "Kursi", harga: 50000,
                    cover: "https://tse1.mm.bing.net/th?id=OIP.vHwvyr3pUCiMjiU-LlqRBQHaHa&pid=Api&P=0&w=173&h=173"
                },
            ],
            action: "",
            id: "",
            nama: "",
            harga: 0,
            cover: "",
            selectedItem: null,
        }
        this.state.filterbarang = this.state.barang
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev => this.setState({ keyword: ev.target.value })} onKeyUp={ev => this.searching(ev)} />
                    {this.state.filterbarang.map((item, index) => (
                        <Card

                            nama={item.nama}
                            harga={item.harga}
                            cover={item.cover}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>


                <button className="btn btn-success" onClick={() => this.Add()}>

                    Tambah Data
                </button>
               
                <div className="modal" id="modal_barang">
                    <div className="modal-dialog">
                        <div className="modal-content">
                      
                            <div className="modal-header">
                                Form Keranjang
                            </div>
               
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Barang

                                    <input type="text" className="form-control mb-2"

                                        value={this.state.nama}
                                        onChange={ev => this.setState({
                                            nama:
                                                ev.target.value
                                        })}
                                        required />
                                    
                                    Harga barang

                                    <input type="number" className="form-control mb-2"

                                        value={this.state.harga}
                                        onChange={ev => this.setState({
                                            harga:
                                                ev.target.value
                                        })}
                                        required />
                                    Cover Barang

                                    <input type="url" className="form-control mb-2"

                                        value={this.state.cover}
                                        onChange={ev => this.setState({
                                            cover:
                                                ev.target.value
                                        })}
                                        required />

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
     
        $("#modal_barang").show()
        this.setState({
            id: Math.random(1, 10000000),

            nama: "",
            cover: "",
            harga: 0,
            action: "insert"
        })
    }
    Edit = (item) => {
    
        $("#modal_barang").show()
        this.setState({
            id: item.id,
            nama: item.nama,
            cover: item.cover,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
    
        let tempBarang = this.state.barang
        if (this.state.action === "insert") {
       
            tempBarang.push({
                id: this.state.id,
                nama: this.state.nama,
                cover: this.state.cover,
                harga: this.state.harga,
            })

        } else if (this.state.action === "update") {
     
            let index = tempBarang.indexOf(this.state.selectedItem)
            tempBarang[index].id = this.state.id
            tempBarang[index].nama = this.state.nama
            tempBarang[index].cover = this.state.cover
            tempBarang[index].harga = this.state.harga
        }
        this.setState({ barang: tempBarang })
     
        $("#modal_barang").hide()
    }
    Drop = (item) => {
     
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
   
            let tempBarang = this.state.barang
     
            let index = tempBarang.indexOf(item)
      
            tempBarang.splice(index, 1)
            this.setState({ barang: tempBarang })
        }
    }
    searching = event => {
        if (event.keyCode === 13) {
      
            let keyword = this.state.keyword.toLowerCase()
            let tempBarang = this.state.barang
            let result = tempBarang.filter(item => {
                return item.nama.toLowerCase().includes(keyword) ||
                    item.penulis.toLowerCase().includes(keyword) ||
                    item.penerbit.toLowerCase().includes(keyword)
            })
            this.setState({ filterbarang: result })
        }
    }

}

export default Keranjang;