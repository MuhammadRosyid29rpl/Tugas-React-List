import React from "react"
class Card extends React.Component {
    render() {
        return (
            <div className="col-lg-6 col-sm-12 p-6">
                <div className="card">
                    <div className="card-body row">
                 
                        <div className="col-8">
                            <h5 className="text-info">

                                {this.props.judul}
                            </h5>

                            <h6 className="text-dark">
                                Tanggal: {this.props.tanggal}
                            </h6>

                            <h6 className="text-dark">

                                Tempat: {this.props.tempat}
                            </h6>
                            <h6 className="text-danger">
                                Deskripsi:
                            </h6>
                            {this.props.deskripsi} 
                        
                            <br></br>
                            <button className="btn btn-sm btn-primary m-1"
                                onClick={this.props.onEdit}>
                                Edit
                            </button>
           
                            <button className="btn btn-sm btn-danger m-1"
                                onClick={this.props.onDrop}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Card;