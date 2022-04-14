import React, {Component} from 'react' ;
 import $ from 'jquery';
 import axios from 'axios';
 
 class Pegawai extends Component{
 
 constructor(){
    super();
 this.state={
 pegawai:[],//arraypegawaiuntukmenampungdatapegawai
 nip:"",
 nama:"",
 alamat:"",
 action:"",
 search:"",
}

 }
 
 render(){
 return(
    <div className="m-3 card">  
	        <div className="card-header bg-info text-white">Data Pegawai</div>  
	        <div className="card-body">  
	        <input type="text" className="form-control mb-2" name="search" value={this.state.search}  
	          onChange={this.bind} onKeyUp={this.findPegawai} placeholder="Pencarian..." />  
	        {/* tampilan tabel pegawai */}  
	          <table className="table">  
	            <thead>  
	              <tr>  
	                <th>NIP</th>  
	                <th>Nama</th>  
	                <th>Alamat</th>  
	                <th>Option</th>  
	              </tr>  
	            </thead>  
	            <tbody>  
	              {this.state.pegawai.map((item,index) => {  
	                return (  
	                  <tr key={index}>  
	                    <td>{item.nip}</td>  
	                    <td>{item.nama}</td>  
	                    <td>{item.alamat}</td>  
	                    <td>  
	                      <button className="btn btn-sm btn-info m-1" data-toggle="modal" data-target="#modal" onClick={() => this.Edit(item)}>  
	                        Edit  
	                      </button>  
	                      <button className="btn btn-sm btn-danger m-1" onClick={() => this.Drop(item.nip)}>  
	                        Hapus  
	                      </button>  
	                    </td>  
	                  </tr>  
	                );  
	              })}  
	            </tbody>  
	          </table>  
              
	          <button className="btn btn-success" onClick={this.Add} data-toggle="modal" data-target="#modal">  
	            Tambah Data  
	          </button>  
	          {/* modal form pegawai */}  
	          <div className="modal" id="modal">  
	            <div className="modal-dialog">  
	              <div className="modal-content">  
	                <div className="modal-header">  
	                  Form Pegawai  
	                </div>  
	                <form onSubmit={this.SavePegawai}>  
	                    <div className="modal-body">  
	                    NIP  
	                    <input type="number" name="nip" value={this.state.nip} onChange={this.bind} className="form-control" required />  
	                    
                        Nama  
	                    <input type="text" name="nama" value={this.state.nama} onChange={this.bind} className="form-control" required />  
	                    
                        Alamat  
	                    <input type="text" name="alamat" value={this.state.alamat} onChange={this.bind} className="form-control" required />  
	                  </div>  
	                  <div className="modal-footer">  
	                    <button className="btn btn-sm btn-success" type="submit">  
	                    Simpan  
	                    </button>  
	                  </div>  
	                </form>  
	              </div>  
	            </div>  
	          </div>  
	        </div>  
	      </div>  
        );
    }
	bind=(event) => {
		this.setState({[event.target.name]:event.target.value});
		}
		Add = () => {
		//mengosongkanisivariabelnip,nama,danalamat
		//setactionmenjadi&quot;insert&quot;
		this.setState({
		nip:"",
		nama:"",
		alamat:"",
		action:"insert"
		});
		}
		Edit = (item) => {
		/*
		-mengisikanisivariabelnip,nama,alamatsesuaidengandatayang
		akandiedit
		-setactionmenjadi&quot;update&quot;
		*/
		this.setState({
		nip:item.nip,
		nama:item.nama,
		alamat:item.alamat,
		action:"update"
		});
		}
		getPegawai = () =>{
 let url="http://localhost:2910/pegawai&quot";
		//mengaksesapiuntukmengambildatapegawai
		axios.get(url)
		.then(response=>{
	//mengisikandatadariresponAPIkearraypegawai
		this.setState({pegawai:response.data.pegawai});
		})
		.catch(error=>
			{console.log(error);
		});
		}
		
		findPegawai = (event) => {
		let url="http://localhost:2910/pegawai"
		if(event.keyCode===13){
		//menampungdatakeywordpencarian
		let form={
		find:this.state.search
		}
		//mengaksesapiuntukmengambildatapegawai
		//berdasarkankeyword
		axios.post(url,form)
		.then(response=>{
	//mengisikandatadariresponAPIkearraypegawai
		this.setState({pegawai:response.data.pegawai});
		})
		.catch(error=>{console.log(error);
		});
		}
		}
		SavePegawai =(event)=>{
		event.preventDefault();
		/*menampungdatanip,namadanalamatdariForm
		kedalamFormData()untukdikirim*/
		let url="";
		if(this.state.action === "insert"){
		url= "http://localhost:2910/pegawai/save"
		} else {
		url="http://localhost:2910/pegawai/update"
		}
		
		let form={
		nip:this.state.nip,
		nama:this.state.nama,
		alamat:this.state.alamat
		}
		//mengirimdatakeAPIuntukdisimpanpadadatabase
		axios.post(url,form)
		.then(response => {
	//jikaprosessimpanberhasil,memanggildatayangterbaru
		this.getPegawai();
		})
		.catch(error=>{
		
		console.log(error);
		});
		//menutupformmodal
		$("#modal").modal('hide');
	}
		Drop = (nip) =>{
let url="http://localhost:2910/pegawai/"+nip;
		//memanggilurlAPIuntukmenghapusdatapadadatabase
		if(window.confirm("Apakah Anda yakin ingin menghapus data ini")){
		axios.delete(url)
		.then(response=>{
	//jikaproseshapusdataberhasil,memanggildatayangterbaru
		this.getPegawai();
		})
		.catch(error=>{console.log(error);
		});
		}
		}
		componentDidMount(){
		//methodyangpertamakalidipanggilpadasaatloadpage
		this.getPegawai()
		}
}

export default Pegawai;