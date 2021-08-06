import React from "react";
import Form from "./Form";

function App() {
    return <div className="container">

        <div className="row">

            <div className="col-lg-6 col-md-6 col-sm-12">
                <h1>Get Loans to meet your needs in less than 72 hours with low interest</h1>
                <p>Grow and expand your business with our range of easily accessible loans, because we make access to loans easy
                    and convenient.</p>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">

                <div className="card" style={{ width: "30rem" }}>
                    <div className="card-body">
                        <h3 className="card-title">LOAN CALCULATOR</h3>

                        <Form />




                    </div>
                </div>

            </div>

        </div>

    </div>;
}





export default App;