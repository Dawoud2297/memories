import { Button } from 'react-bootstrap';
import Close from '@material-ui/icons/Close'
import { ReportStyle } from './reportpageStyles';
import { useState } from 'react';
import { reportMemory } from '../../action/memories'
import { useDispatch } from 'react-redux';



const ReportPage = (props) => {
  const [specialReport, setSpecialReport] = useState(false);
  const [reportValue, setReportValue] = useState({report : ''});
  const [thanks, setThanks] = useState(false)
  const dispatch = useDispatch()
  
  const submitForm = (e) =>{
    e.preventDefault()
    dispatch(reportMemory(props.memory._id,reportValue))
    setThanks(true)
    
  }
  
  const endReport = () =>{
    props.setReport(false)
  }
  
  const runSpecialReport = () =>{
    setSpecialReport(true)
    if(specialReport){
      setSpecialReport(false)
    }
  }
  const closeButton = () =>{
    props.setReport(false)
    setSpecialReport(false)
  }
    return (props.report) ?
    (
      <>
      <ReportStyle/>
    <div className='popup'>
      <div className='popup-inner'>
        <div>
         {
           thanks ? (    
             <>
             <p>Tahnks for your feedback</p>
             <Button onClick={endReport}>Done</Button>
             </>
           ): (
            <form onSubmit={submitForm} className='list'>    
            <div class="form-check box">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
              <label class="form-check-label" for="flexCheckDefault">
                Default checkbox
              </label>
            </div>
            <div class="form-check box">
              <input class="form-check-input" type="checkbox" value="spam" onChange={e=>setReportValue({report: e.target.value})} id="spam" />
              <label class="form-check-label" for="spam">
                Spam
              </label>
            </div>
            <div class="form-check box">
              <input class="form-check-input" type="checkbox" value="misleading" onChange={e=>setReportValue({report: e.target.value})} id="mis" />
              <label class="form-check-label" for="mis">
                Misleading
              </label>
            </div>
            <div class="form-check box">
              <input class="form-check-input" type="checkbox" value="Sexual Content" onChange={e=>setReportValue({report: e.target.value})} id="sexual" />
              <label class="form-check-label" for="sexual">
                Sexual Content
              </label>
            </div>
            <div className="form-check box" >
              <input className="form-check-input" type="checkbox" id="none"/>
              <label className="form-check-label" for="none" onClick={runSpecialReport}>
                none of the above
              </label>
            </div>
            {
              specialReport && (
            <div className='special'>
              <textarea style={{width:'100%'}} value={reportValue.report} onChange={(e)=>setReportValue({report: e.target.value})}>                    
              </textarea>
            </div>
              )
            }
            <div>
            <Button type='submit' className='submit'>Submit</Button>
            </div>
      </form>
           )
         }
        </div>
         
        <Button size="small" style={{backgroundColor:'transparent',border:'none'}} className='close-btn' onClick={closeButton}><Close/></Button>
      </div>
    </div>
      </>
 ) : ""   
};

export default ReportPage;
