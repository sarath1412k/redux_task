import React, { useEffect, useState } from 'react'
import './PrescriptionForm.css'
import { useDispatch, useSelector } from 'react-redux'
import { addPrescription as addPrescriptionAction,editedPrescriptionList } from '../prescriptionSlice'


const PrescriptionForm = () => {
  const dispatch = useDispatch()
  let editData = useSelector(state => state.prescription.editData)
  const editIndex = useSelector(state => state.prescription.editIndex)
  const [details,setDetails] = useState({
    medicine:'',
    dosage:'',
    strength:'',
    frequency:{morning:false,afternoon:false,evening:false},
    duration:'',
    durationType:'hours',
    medicineTaken:'before food'
})

  useEffect(() =>{
    if(editData){
      setDetails(editData)
    }
  },[editData])

  //  handle input field changes
  const handleInput = ({target}) => {
    const value = target.value
    const key = target.name
    setDetails(prev => ({...prev,[key]:value}))
  }

  //handle checkbox input changes
  const handleCheckBoxInput = ({target}) => {
    const id = target.id
    setDetails(prev => ({...prev,frequency:{...prev.frequency,[id]:!prev.frequency[id]}}))
  }

//submit the data
  const onSubmit= async(e) => {
    e.preventDefault()

    //form validation
    if(details.medicine.trim() !== '' && details.dosage.trim() !== '' && details.strength.trim() !== '' && details.duration.trim() !== ''&& (details.frequency.morning || 
      details.frequency.afternoon || details.frequency.evening)){
      if(await editIndex >= 0){
        dispatch(editedPrescriptionList({index:editIndex,updatedItem:details}))
      }
      else{
        dispatch(addPrescriptionAction(details))
      }
      alert('Prescription saved successfully')
      setDetails({
        medicine:'',
        dosage:'',
        strength:'',
        frequency:{morning:false,afternoon:false,evening:false},
        duration:'',
        durationType:'hours',
        medicineTaken:'before food'
      })
    }
    else{
      if(details.medicine.trim() === ''){
        alert('PLease enter the medicine')
      }
      if(details.dosage.trim() === ''){
        alert('Please enter the dosage')
      }
      if(details.strength.trim() === ''){
        alert('Please enter the strength')
      }
      if(details.duration.trim() === ''){
        alert('Please enter the duration')
      }
      if(!details.frequency.morning ||   !details.frequency.afternoon || !details.frequency.evening){
        alert('Please enter the frequency')
      }
    } 
  }

  // prescription form
  return (
    <div className='container-fluid'>
      <form className='presc-form' autoComplete='off'>
        <div className='row'>
        <div className='col-sm-4 input-seg'>
        <label className='legend-label'>Medicine<span className='important text-danger'>*</span></label>
        <input type='text' name='medicine' onChange={handleInput} value={details.medicine} />
        </div>
        <div className='col-sm-4 input-seg'>
        <label className='legend-label'>Dosage<span className='important text-danger'>*</span></label>
        <input type='text' name='dosage' onChange={handleInput} value={details.dosage} />
        </div>
        <div className='col-sm-4 input-seg'>
        <label className='legend-label'>Strength<span className='important text-danger'>*</span></label>
        <input type='text' name='strength' onChange={handleInput} value={details.strength} />
        </div>
        </div>

        <div className='row'>
          <div className="col-sm-4 input-seg text-center">
            <label className='legend-label'>Frequency<span className='important text-danger'>*</span></label>
            <div className="input-layout">
            <div className="col-sm-4">
                <input type="checkbox" id='morning' name='frequency' onChange={handleCheckBoxInput} checked={details.frequency.morning} />
                <label className='checkbox-label' htmlFor="morning" >Morning</label>
            </div>
            <div className="col-sm-4">
                <input type="checkbox" id='afternoon' name='frequency' onChange={handleCheckBoxInput} checked={details.frequency.afternoon} />
                <label className='checkbox-label' htmlFor="afternoon" >Afternoon</label>
            </div>
            <div className="col-sm-4">
                <input type="checkbox" id='evening' name='frequency' onChange={handleCheckBoxInput} checked={details.frequency.evening} />
                <label className='checkbox-label' htmlFor="evening"  >Evening</label>
            </div>
            </div>
          </div>

          <div className="col-sm-4 input-seg center">
          <label className='legend-label'>Duration<span className='important text-danger'>*</span></label>
            <div className="input-layout">
            <input type="text" className='duration-input' name="duration" onChange={handleInput} value={details.duration} />
            <select className='duration-select' name='durationType' onChange={handleInput} value={details.durationType}>
              <option value="hours">Hours</option>
              <option value="minutes">Minutes</option>
            </select>
            </div>
          </div>

          <div className="col-sm-4 center">
          <div className="switch-field">
		    <input type="radio" id="radio-one" name="medicineTaken" value="before food" onChange={handleInput} checked={details.medicineTaken === 'before food'} />
		    <label htmlFor="radio-one">Before food</label>
		    <input type="radio" id="radio-two" name="medicineTaken" value="after food" onChange={handleInput} checked={details.medicineTaken === 'after food'}/>
		    <label htmlFor="radio-two">After food</label>
	        </div>
          </div>
        </div>
        <div className="row btn-container">
            <div className="col-sm">
                <button className="add-btn btn btn-sm btn-warning" onClick={onSubmit}>Add Medicine</button>
            </div>
        </div>
      
      </form>
    </div>
  )
}

export default PrescriptionForm