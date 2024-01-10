import React, { useEffect, useState } from 'react'
import home from '../images/home.png';
import logo from '../images/logo.png';
import gpay from '../images/05_logo_gpay.6a3cb873.png';
import phonepe from '../images/05_logo_phonepe.3264c8eb.png';
import upi from '../images/05_logo_upi.863e7765.png';
import paytm from '../images/paytm.svg';
import { useNavigate, useParams } from 'react-router-dom';
import upiimg from '../images/upi.png'
import paytmimg from '../images/paytm.png'
import phonepeImg from '../images/phonepay.png'
import gpayImg from '../images/gpay.png'

const Appchoose = () => {

    const { amount, uid } = useParams();
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [selectradio, setSelectradio] = useState('1')

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const handelChange = (e) => {
        setSelectradio(e.target.value);
    }

    return (
        <>
            <div className="payPage router-view">

                <div data-v-4a55872c="" className="nav">Payment</div>

                <div data-v-4a55872c="" className="nav fixed">Payment</div>

                <div data-v-4a55872c="" className="wrap">
                    <div data-v-4a55872c="" className="card">
                        <div data-v-4a55872c="" className="amt">
                            Amount Payable
                            <span data-v-4a55872c="" className="n"></span>
                            <span data-v-4a55872c="" className="s">₹{Number(amount).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div data-v-4a55872c="" className="bottomInfo">
                    <div data-v-4a55872c="" className="payList">

                        <div data-v-4a55872c="" className={`im ${selectradio === '1' && 'slt'}`}>
                            <div data-v-4a55872c="" className="lt">
                                <img data-v-4a55872c="" src={paytmimg} alt="" />
                                <span data-v-4a55872c="">Paytm</span>
                            </div>
                            <div data-v-4a55872c="" className="rt">
                                <input type="radio" name='upi' defaultChecked className='w-5 h-5' onChange={handelChange} value="1" />
                            </div>
                        </div>

                        <div data-v-4a55872c="" className={`im ${selectradio === '2' && 'slt'}`}>
                            <div data-v-4a55872c="" className="lt">
                                <img data-v-4a55872c="" src={phonepeImg} alt="" />
                                <span data-v-4a55872c="">PhonePe</span>
                            </div>
                            <div data-v-4a55872c="" className="rt">
                                <input type="radio" name='upi' className='w-5 h-5' onChange={handelChange} value="2" />
                            </div>
                        </div>

                        <div data-v-4a55872c="" className={`im ${selectradio === '3' && 'slt'}`}>
                            <div data-v-4a55872c="" className="lt">
                                <img data-v-4a55872c="" src={gpayImg} alt="" />
                                <span data-v-4a55872c="">GooglePay</span>
                            </div>
                            <div data-v-4a55872c="" className="rt">
                                <input type="radio" name='upi' className='w-5 h-5' onChange={handelChange} value="3" />
                            </div>
                        </div>

                        <div data-v-4a55872c="" className={`im ${selectradio === '4' && 'slt'}`}>
                            <div data-v-4a55872c="" className="lt">
                                <img data-v-4a55872c="" src={upiimg} alt="" />
                                <span data-v-4a55872c="">UPI</span>
                            </div>
                            <div data-v-4a55872c="" className="rt">
                                <input type="radio" name='upi' className='w-5 h-5' onChange={handelChange} value="4" />
                            </div>
                        </div>

                    </div>
                </div>

                <div data-v-4a55872c="" className="payBtn my-10 mx-6]">
                    <button onClick={() => navigate('/pay', { state: { uid, amount, selectradio } })} data-v-4a55872c="" type="button" className="bg-[#1989fa] rounded-full w-full text-white text-xl font-bold py-4  ">
                        <div className="van-button__content">
                            <span className="van-button__text">Pay ₹ {Number(amount).toFixed(2)}</span>
                        </div>
                    </button>
                </div>

            </div>


        </>
    )
}

export default Appchoose