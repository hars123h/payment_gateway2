import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BASE_URL, { redirectUrl } from '../api_url';
import axios from 'axios';

const UTR = () => {

    const location = useLocation().state;
    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState();
    const [refno, setRefno] = useState('');
    const [loading, setLoading] = useState(false);
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const toaster = useCallback((text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/mine');
        }, 3000);

    }, [])

    const handleRecharge = async () => {
        //console.log({ refno, recharge_value, status: 'pending' });
        if (refno.length !== 12) {
            toaster('Enter a valid Ref No. of 12 digits');
            return;
        }

        // setLoading(true)
        try {
            await axios.post(`${BASE_URL}/place_recharge`, {
                refno,
                recharge_value: location.amount,
                user_id: location.uid,
                mobno: userDetails.mobno,
                time: new Date(),
                parent_id: userDetails.parent_id,
                grand_parent_id: userDetails.grand_parent_id ? userDetails.grand_parent_id : '',
                great_grand_parent_id: userDetails.great_grand_parent_id ? userDetails.great_grand_parent_id : ''
            }).then((response) => {
                console.log(response.data);
                if (response.data.message === 'refno already exists') {
                    setLoading(false)
                    toaster('RefNo already exists');
                    setRefno('');
                    console.log('RefNo already exists');
                } else {
                    setLoading(false)
                    toaster('Request Placed Successfully!');
                    setRefno('');
                    console.log('Recharge placed successfully!');
                    setTimeout(() => {

                        // navigate('/deposit_records')
                        window.location.href = `${redirectUrl}/records`

                    }, 3000);
                }
            })
            //console.log("Document written with ID: ", docRef1.id, docRef2.id);
        } catch (e) {
            setLoading(false)
            console.error("Error adding document: ", e);
        }
    }

    const getUserDetails = async () => {
        await axios.post(`${BASE_URL}/get_user`, { user_id: location.uid }).then(({ data }) => {
            if (data) {
                setUserDetails(data);
                // setOriginalwpwd(data.wpwd);
                // setOriginalpwd(data.pwd);
                // localStorage.setItem('user_invite', data.user_invite);
                // localStorage.setItem('wpwd', data.wpwd);

                return data
            } else {
                //console.log('Data not found');
                // toaster('Please login')
            }
        }).catch(error => console.log('Some error occured', error));

        // getuserearn();
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    console.log(userDetails);


    return (
        <div>

            {toasterShow &&
                <div className='top-0 left-0 right-0 bottom-0 p-5 z-[9999999] fixed flex items-center'>
                    {/* <div className="before:content-[''] fixed top-0 left-0 right-0 bottom-0 bg-[rgba(46,46,46,0.1)] z-[1] backdrop-blur-[3px]"></div> */}
                    <div className="flex items-start bg-[#00000084] max-w-[250px] px-5 -top-5 relative w-fit mx-auto shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] z-[2] rounded-[7px] ">
                        <div className="flex-1 px-[5px] py-2">
                            <p className='text-base text-white text-center'>{toasterText}</p>
                        </div>
                    </div>
                </div>
            }

            <div className="content"><p className="title">Payment Confirm</p>
                <p style={{ fontSize: '12px', fontFamily: 'lato', fontWeight: '400', color: '#464646' }}>Please enter the 12-digit transaction UTR
                    No.</p>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', margin: '46px 0 10px 0' }}>
                    <input onChange={e => setRefno(e.target.value)} className="input_utr" placeholder="12-digital No." type="number" />
                    <span className="utr_text">UTR</span></div>
                <p style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '20px', fontSize: '12px', fontFamily: 'lato', fontWeight: '400', color: "#044384" }}>
                    Please updating your Phonepe's version so that we can receive your payment status next time.</p>

                <button onClick={handleRecharge} className="btn" >Submit</button>
            </div>
        </div>
    )
}

export default UTR