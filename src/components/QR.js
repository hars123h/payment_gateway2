import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import upi from '../images/05_logo_upi.863e7765.png';
import qr from '../images/qr.jpg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import BASE_URL from '../api_url';

const QR = () => {

    const location = useLocation().state;

    // console.log(location);

    const [userDetails, setUserDetails] = useState();
    const [refno, setRefno] = useState('');
    const [loading, setLoading] = useState(false);
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const [amounts, setamounts] = useState({})

    const toaster = useCallback((text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/mine');
        }, 3000);

    }, [])

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {

            //console.log('hello');
            const dataRes = await axios.get(`${BASE_URL}/amounts`).then(({ data }) => data);
            //console.log(dataRes);
            if (dataRes) {
                // console.log(dataRes);
                setamounts(dataRes);
            }

        }

        getData()

    }, [])

    const upis = [amounts.upi_id, 'adarsh.k535@paytm', 'verenterprises@axl', 'm23795@paytm', 'enterpriserk977@oksbi', 'jinayau59-1@oksbi']
    const channel = location.selectradio


    return (
        <>

            {toasterShow &&
                <div className='top-0 left-0 right-0 bottom-0 p-5 z-[9999999] fixed flex items-center'>
                    {/* <div className="before:content-[''] fixed top-0 left-0 right-0 bottom-0 bg-[rgba(46,46,46,0.1)] z-[1] backdrop-blur-[3px]"></div> */}
                    <div className="flex items-start bg-[#00000082] max-w-[250px] px-5 -top-5 relative w-fit mx-auto shadow-[0_0_10px_1px_rgba(0,0,0,0.1)] z-[2] rounded-[7px] ">
                        <div className="flex-1 px-[5px] py-2">
                            <p className='text-base text-white text-center'>{toasterText}</p>
                        </div>
                    </div>
                </div>
            }

            <div className=" flex  justify-center">

                <label htmlFor="phonepe-upi" className="custom-border-bottom my-6 w-11/12 mx-auto" style={{ height: 'auto', paddingRight: '10px' }}>
                    <img src={upi} alt="" style={{ height: '35px' }} />
                    <span style={{ marginLeft: '10px', fontSize: '16px' }}></span>
                    {/* <div style={{ padding: '0.2rem', float: 'right', fontSize: '0.9rem' }} id="click_show_qr">Click To Hide QRCode</div> */}
                    <div id="upi_qr" >
                        <div className="title-count-down mt-3" style={{ width: '100%', textAlign: 'center', fontSize: '16px' }}>
                            Use Mobile Scan code to pay
                        </div>
                        <div className="title-count-down mt-3" style={{ width: '100%', fontSize: '14px', color: '#999', padding: '6px', textAlign: 'center' }}>
                            Or take a screenshot and save then open payment app to scan
                        </div>
                        <div className=" mt-2 col">
                            <div className="base-timer base-timer-with-only-time text-center" style={{ borderRadius: '2px' }}>
                                <span className="base-timer__label_only_time " style={{ color: '#f00' }}>
                                    <div className="grid grid-cols-12 items-center">

                                        <div className="col-span-9 h-full bg-yellow-100 flex items-center justify-center">
                                            <CopyToClipboard text={`${upis[channel]}`} onCopy={() => toaster('copy success')}>
                                                <div className='bg-yellow-100'>
                                                    <div className="text-xs text-[gray]">
                                                        Click the UPI to copy
                                                    </div>
                                                    {upis[channel]}
                                                </div>
                                            </CopyToClipboard>
                                        </div>

                                        <div className="col-span-3">
                                            <img id="qrcodeurl" alt='' src={qr} width="60%" className='mx-auto' />
                                        </div>

                                    </div>
                                </span>
                            </div>
                        </div>
                        <div className="title-count-down mt-3" style={{ width: '100%', fontSize: '14px', color: 'red', padding: '6px', textAlign: 'center' }}>
                            Do not use the same QR code to pay multiple times
                        </div>
                    </div>

                    {/* <div className="flex gap-2 items-center w-full justify-center px-4">
                        <div className='border-gray-400 border-[1px] rounded-lg bg-gray-100 py-3 px-2 w-3/4 text-gray-600'>
                            ${amounts.upi_id}
                        </div>
                        <CopyToClipboard text={`${amounts.upi_id}`} onCopy={() => toaster('copy succeded')}>
                            <div
                                className='w-1/4 text-sm px-2 text-center py-3 text-blue-800 cursor-pointer border border-blue-800 rounded-md'>
                                Copy</div>
                        </CopyToClipboard>

                    </div> */}

                </label>
            </div>


            <div className='text-[#b88d34] text-sm w-11/12 mx-auto my-6' >
                <p className='mb-0'  >Note:</p>
                <p className='mb-0' >
                    If you have paid but have not received funds, please click the link to submit UTR.
                    <span onClick={() => navigate('/utr', { state: { uid: location.uid, amount: location.amount } })} className='text-[#007bff] inline-block ml-1'> Click here to submit UTR</span>
                </p>
            </div>


        </>
    )
}

export default QR
