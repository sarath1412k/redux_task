import React from 'react'
import './PrescriptionList.css'
import { useDispatch, useSelector } from 'react-redux'
import { editPrescription, deletePrescription } from '../prescriptionSlice'
 
const MedicineList = () => {
  const dispatch = useDispatch()
  const prescriptionList = useSelector(state => state.prescription.prescriptionList)
  
  //handle the edit function
  const handleEdit = (data,index) => {
    dispatch(editPrescription({data,index}))
  }

  //handle delete function
  const handleDelete = (index) => {
    dispatch(deletePrescription(index))
  }
  //list the prescription list
  return (
    <div className="container-fluid">
    <div className='presc-list'>
      <div className='list-title'>List of medicines added</div>
      <div className="table-responsive table-box">
      <table className='table'>
        <thead>
          <tr>
            <th className="">Medicine Name</th>
            <th className="">Strength</th>
            <th className="">Dosage</th>
            <th className="">Frequency</th>
            <th className="">Duration</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          { prescriptionList.length === 0 ? <tr><td className='no-record' colSpan={6}>No items found</td></tr> :
            prescriptionList.map((data,i) => 
             <tr key={i}>
              <td>{data.medicine}</td>
              <td>{data.strength}</td>
              <td>{data.dosage}</td>
              <td>{data.frequency.morning&&'morning'}{data.frequency.afternoon&&'afternoon'}{data.frequency.evening&&'evening'}</td>
              <td>{data.duartion}{data.durationType}</td>
              <td className='btn-groups'>
                <button className='btn btn-primary' onClick={() => handleEdit(data,i) } >Edit</button>
                <button className='btn btn-danger' onClick={() => handleDelete(i)} >Delete</button>
              </td>
             </tr> 
              )
          }    
        </tbody>
      </table>
      </div> 
    </div>
    </div>
  )
}

export default MedicineList