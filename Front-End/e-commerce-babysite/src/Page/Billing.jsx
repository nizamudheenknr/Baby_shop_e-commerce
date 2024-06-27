import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { shopItem } from '../Component/Mainshop'


const Billing = () => {
  const {sitem} = useContext(shopItem)
  const {id} = useParams()
  const billingData = sitem.find((item)=>item.id===parseInt(id))
  return (
      <section>
  <div className="container py-5">
    <div className="row d-flex justify-content-center">
      <div className="col-md-9 col-lg-7 col-xl-5">
        <div className="card">
          <img src={billingData.image}
            className="card-img-top" alt="Black Chair" style={{height:'400px',width:'526px'}} />
          <div className="card-body">
            <div className="card-title d-flex justify-content-between mb-0">
              <p className="text-muted mb-0">{billingData.productname}</p>
              <p className="mb-0">{billingData.price}</p>
            </div>
          </div>
          <div className="rounded-bottom" style={{backgroundColor: "#eee"}}>
            <div className="card-body">
              <p className="mb-4">Your payment details</p>

              <div className="form-outline mb-3">
              
                <input type="text" id="formControlLgXM8" className="form-control"
                  placeholder="1234 5678 1234 5678" />
                <label className="form-label" htmlFor="formControlLgXM8">Card Number</label>
              </div>

              <div className="row mb-3">
                <div className="col-6">
                  <div className="form-outline">
                    <input type="password" id="formControlLgExpk8" className="form-control"
                      placeholder="MM/YYYY" />
                    <label className="form-label" htmlFor="formControlLgExpk8">Expire</label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-outline">
                    <input type="password" id="formControlLgcvv8" className="form-control" placeholder="Cvv" />
                    <label className="form-label" htmlFor="formControlLgcvv8">Cvv</label>
                  </div>
                </div>
              </div>

              <button className="btn btn-info btn-block">Order now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Billing