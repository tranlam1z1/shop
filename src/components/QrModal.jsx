import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';
import Thank from './Thank';
import { BACK_END_HOST } from '../utils/AppConfig';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearProduct } from '../redux/Slices/cartSlice.js';
import axios from 'axios';
import Swal from 'sweetalert2'


const QrModal = (props) => {
    const { show,
        setShow,
        total,
        uuid,
        postData,
        ...rest } = props;
    const bank = {
        BANK_ID: "MBBank",
        ACCOUNT_NO: "9808650655130",
        TEMPLATE: "compact2",
        AMOUNT: total,
        DESCRIPTION: uuid,
        ACCOUNT_NAME: 'LAI NGOC LAM'
    }


    const api_get = "https://oauth.casso.vn/v2/transactions?sort=DESC";
    const CASSO_API_KEY = "AK_CS.6c00f2a0254411efa25ac5d284bd6c82.WbdVdrlkMT3EL8CGiuySVdTZ8CaF2xTkUQ6Vl3tdr34tzsqtz7zz44EKskJWETvG5LhC4gWN"

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [isPaid, setIsPaid] = useState(false);

    const fetchData = async () => {
        try {
            const res = await fetch(api_get, {
                headers: {
                    Authorization: `apikey ${CASSO_API_KEY}`,
                    "Content-Type": "application/json",
                }
            });
            const jsonData = await res.json();
            setData(jsonData);

            //handle send success
            jsonData.data.records.forEach(trans => {
                //lam tron xuong va so sanh + xoa dau '-' cua uuid
                if (Math.floor(trans.amount) >= Math.floor(total) && trans.description.includes(uuid.replace(/-/g, ""))) {
                    saveOrder();
                    return;
                }
            })

        } catch (error) {
            console.log('fetchData qr error', error);
        }
    }

    useEffect(() => {
        if (show && !isPaid) {
            fetchData();

            const intervalId = setInterval(() => {
                fetchData();
            }, 3000)

            //clear khi component bi huy
            return () => clearInterval(intervalId);
        }
    }, [show, isPaid])


    const saveOrder = async () => {
        axios.post(`${BACK_END_HOST}/order`, postData)
            .then(res => {
                setIsPaid(true);
                toast.success('Thanh toán thành công ❤️\nCảm ơn bạn')
                dispatch(clearProduct());
                setTimeout(() => {
                    navigate("/");
                }, 4000)
            })
            .catch(error => {
                console.log('saveOrder error:', error);
                toast.error('Có lỗi gì đó đã xảy ra!😭\nVui lòng liên hệ admin qua facebook/zalo/sdt')
            })
    };

    const handleClose = () => {
        Swal.fire({
            title: "Bạn có muốn dừng thanh toán?",
            text: "Nếu bạn đã chuyển khoản vui lòng ấn nút \"ĐÓNG\" và đợi chúng mình trong giây lát!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#057130",
            cancelButtonText: "Đóng",
            confirmButtonText: "Hủy thanh toán"
        }).then((result) => {
            if (result.isConfirmed) {
                setIsPaid(false);
                setShow(false);
            }
        });
    };

    return (
        <div>
            <Modal show={show} style={{ minWidth: '100%' }}>
                {
                    isPaid ? <Thank /> :
                        (
                            // <div>
                            //     <Modal.Header>
                            //         <Modal.Title style={{ color: 'red' }}>
                            //             Vui lòng không sửa nội dung chuyển khoản!<br/>
                            //         </Modal.Title>
                            //     </Modal.Header>
                            //     <Modal.Body>
                            //         <img src={`https://img.vietqr.io/image/${bank.BANK_ID}-${bank.ACCOUNT_NO}-${bank.TEMPLATE}.png?amount=${bank.AMOUNT}&addInfo=${bank.DESCRIPTION}&accountName=${bank.ACCOUNT_NAME}`} alt="Error" width={'100%'} />
                            //     </Modal.Body>
                            //     <Modal.Footer>
                            //         <Button variant="secondary" onClick={handleClose}>
                            //             Đóng
                            //         </Button>
                            //     </Modal.Footer>
                            // </div>
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                <div className="bg-white p-5 rounded-lg">
                                    <h2 className="text-lg font-semibold mb-3">Thanh toán</h2>
                                    <div className='flex justify-center'>
                                        <img
                                            src={`https://img.vietqr.io/image/${bank.BANK_ID}-${bank.ACCOUNT_NO}-${bank.TEMPLATE}.png?amount=${bank.AMOUNT}&addInfo=${bank.DESCRIPTION}&accountName=${bank.ACCOUNT_NAME}`}
                                            alt="Error"
                                            width={'50%%'} />
                                    </div>

                                    <div className="mt-5" >
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="cardNumber">
                                                Lưu ý: Không chỉnh sửa nội dung chuyển khoản các bạn nhée
                                            </label>
                                            <p className="text-red-700">Quá trình nhận nhận đơn có thể mất 2-3 phút sau chuyển khoản, quý khách vui lòng không tắt popup này !!!</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <div>
                                            </div>

                                            <button
                                                onClick={handleClose}
                                                className="bg-red-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear border-2 border-red-700 font-bold hover:text-red-700 px-4 py-2"
                                            >
                                                Hủy thanh toán
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                }

            </Modal>

        </div>

    )
}

export default QrModal