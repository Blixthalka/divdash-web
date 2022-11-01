import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import avanza from '../images/avanza.png';

const Upload = () => {
    const navigate = useNavigate()
    const banks = [
        {
            image: avanza,
            coming_soon: false,
            tag: "avanza"
        },
        // {
        //     image: nordnet,
        //     coming_soon: true,
        //     tag: "nordnet"
        // }
    ]

    return (
        <>
            <Card title="Choose Bank" >
                <div className="flex space-x-2 mt-2">
                    {banks.map((bank) => (



                        <button
                            className={`border border-dashed border-slate-200 p-5 rounded flex flex-col group justify-center
                                ${bank.coming_soon && 'cursor-default'}
                                ${!bank.coming_soon && "cursor-pointer hover:border-secondary"}`}
                            onClick={(e) => {
                                if (!bank.coming_soon) {
                                    navigate(`/upload/${bank.tag}`)
                                }
                            }}
                        >
                            {bank.coming_soon && <p className="place-self-center text-secondary">coming soon</p>}
                            <img src={bank.image} className="p-2 backdrop-grayscale w-56" disabled={bank.coming_soon} alt={bank.tag} />
                        </button>


                    ))}
                </div>
            </Card>
        </>
    );
}

export default Upload;
